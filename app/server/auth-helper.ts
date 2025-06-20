import { href, redirect } from "react-router";

import { betterAuth } from "@/server/better-auth";
import { caller } from "@/server/trpc-caller";

export async function requireSession(request: Request) {
  return await betterAuth.api.getSession({ headers: request.headers });
}

export async function requireAuthSession(request: Request) {
  const session = await requireSession(request);
  if (!session?.user.id) return { isAuthenticated: false, user: null };
  return { isAuthenticated: true, user: session.user };
}

export async function requireAuthUserData(request: Request) {
  const session = await requireSession(request);
  if (!session?.user.id) return { isAuthenticated: false, user: null };

  const api = await caller(request);
  const user = await api.auth.getUser();
  const isAuthenticated = user !== null;

  return { isAuthenticated, user };
}

// Redirect to /signin if not authenticated
export async function requireAuthTrue(request: Request) {
  const { isAuthenticated, user } = await requireAuthSession(request);
  if (!isAuthenticated) return redirect(href("/signin"));
  return { isAuthenticated, user };
}

// Redirect to /user if authenticated
export async function requireAuthFalse(request: Request) {
  const { isAuthenticated, user } = await requireAuthSession(request);
  if (isAuthenticated) return redirect(href("/dashboard"));
  return { isAuthenticated, user };
}
