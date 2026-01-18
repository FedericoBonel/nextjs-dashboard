import NextAuth, {
  NextAuthConfig,
  Session as NextAuthSession,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { UserDetailsDTO } from "@/apis/dtos/users/user-details";
import { createUnauthorizedResponse } from "@/apis/controllers/utils/responses";
import { authenticateUser } from "@/apis/services/auth";
import { validateUserCredentialsDTO } from "@/apis/validators/auth";

const privateRoutes = ["/dashboard", "/api/invoices"];
const publicRoutes = ["/sign-in"];

/** Config object for the auth provider */
const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    // This is called on *"every"* request that hits the proxy (proxy constraints are part of this) to determine if the user is authorized to access the route from proxy.ts (old middleware.ts)
    authorized: ({ request, auth }) => {
      // check if the user is visiting a page that is under a private one
      const isLoggedIn = auth?.user;

      const isInPrivateRoute = privateRoutes.find((route) =>
        request.nextUrl.pathname.startsWith(route),
      );
      if (isInPrivateRoute && !isLoggedIn) {
        // Here we're redirecting manually, but we could also let NextAuth do it by returning false
        if (request.nextUrl.pathname.startsWith("/api")) {
          // Return a json response for Rest APIs
          return Response.json(createUnauthorizedResponse(), { status: 401 });
        }

        // Otherwise redirect to page
        const url = new URL("/sign-in", request.nextUrl);
        url.searchParams.append("callbackUrl", request.url);

        return Response.redirect(url);
      }

      // Check if the user is trying to visit a page that is only public
      const isInPublicRoute = publicRoutes.find((route) =>
        request.nextUrl.pathname.startsWith(route),
      );
      if (isInPublicRoute && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }

      // In this case is a route that is shared between authenticated and non authenticated users
      return true;
    },
  },
  session: {
    // This relies in a token getting generated after sign in, which includes the original information returned. But is one way, and we don't double check if the user still exists
    // For this app this is fine, however, if we have requirements on users being able to control/RBAC other users, we most likely want to verify the user has access on EVERY request
    // this would include NOT trusting the JWT data and double checking the source of truth (DB) for the identified user.
    //
    // Another option for the second case is to use the "database" strategy instead.
    //
    // This also means that if we change user data (e.g.: roles) this won't be reflected until the user signs in again.
    // This also means we can't invalidate sessions server side (e.g.: logout from all devices), which could be a huge security risk.
    strategy: "jwt",
  },
  providers: [
    // Use Credentials provider for email/password authentication, lets you define your own logic
    Credentials({
      // Authenticates a user into the system. Gives you the values submitted in the sign in form or `signIn()` call
      authorize: async (credentials) => {
        // Validate credentials format (We should maybe do this in the controller to show a more specific error message)
        const validFormatRes = validateUserCredentialsDTO({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (!validFormatRes.success) {
          // This will cause a NextAuth error, you need to catch it wherever you call signIn(), in this app this is the /apis/controllers/auth/actions/index.ts
          return null;
        }

        // Verify credentials are correct
        let authenticatedUser: UserDetailsDTO;
        try {
          authenticatedUser = await authenticateUser(validFormatRes.data);
        } catch (error) {
          // This will cause a NextAuth error, you need to catch it wherever you call signIn(), in this app this is the /apis/controllers/auth/actions/index.ts
          return null;
        }

        // Return authenticated user if everything is ok
        return {
          id: authenticatedUser.id,
          email: authenticatedUser.email,
          name: authenticatedUser.name,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;

export type Session = NextAuthSession;

export const { signIn, signOut, handlers, auth } = NextAuth(authConfig);

// Helper functions for easier auth management

interface AuthOptions {
  /** If true, the user will need to be logged in, defaults to true */
  requiresUser?: boolean;
  /** Gets called when authentication fails */
  onFailure?: (session: Session | null) => void | Promise<void>;
}

/**
 * Checks that the user has access or not and returns the user session if available.
 */
export const authUser = async (opts: AuthOptions = {}) => {
  const { requiresUser = true, onFailure = async () => {} } = opts;
  const userSession = await auth();

  if (requiresUser && !userSession) {
    if (onFailure) {
      await onFailure(userSession);
      return null;
    }

    return null;
  }

  return userSession;
};

/**
 * Verifies the user exists (is logged in) and redirects to sign in page if not
 */
export const verifyUserExists = async () => {
  const session = await authUser({
    onFailure: async () => {
      await signIn();
    },
  });

  return session;
};
