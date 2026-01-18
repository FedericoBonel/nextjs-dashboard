/**
 * Proxy: https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 * This file will be executed for *most* requests to your Next.js application.
 * It allows you to run code before a request is accepted, in optimized cases/infrastructure this can run at the edge (CDN, etc) in a different runtime environment.
 * 
 * This means you have to think this will be a different app from the rest of your server. You can't depend on things like global variables or in-memory caches.
 * 
 * You can use this file to run authentication/authorization logic before requests are processed. 
 * 
 * HOWEVER, this proxy won't always run, for example static routes will go once, but once cached they won't go through this proxy again.
 * So don't use this file for critical security logic, use it as a first layer of defense. 
 * 
 * For critical security logic, use API routes, server functions, or server-side rendering (SSR) pages (not layouts as these can be bypassed). 
 * Always validate on the server side before returning sensitive data or performing sensitive actions.
 * 
 * Here we're authenticating requests using the auth instance from lib/auth.ts, 
 * however this is just as a first layer of defense, and for optimization since this will trigger before rendering/executing anything, 
 * so we can redirect the user as needed from here at times.
 */
import { auth } from "@/lib/auth";

export default auth;

// This tells Next.js to run this middleware on all routes except for /_next/static, /_next/image and image files that are static and need to be optimized
export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
};
