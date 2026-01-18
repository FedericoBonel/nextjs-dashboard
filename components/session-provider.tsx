"use client";

import { PropsWithChildren } from "react";
import { SessionProvider as AuthNextSessionProvider } from "next-auth/react";

/** This is a provider that gets sent down to the client for client side Auth access */
const SessionProvider = ({ children }: PropsWithChildren) => {
  return <AuthNextSessionProvider>{children}</AuthNextSessionProvider>;
};

export default SessionProvider;
