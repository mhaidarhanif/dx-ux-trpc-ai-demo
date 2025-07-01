import { href, redirect } from "react-router";
import { auth } from "@/lib/better-auth";
import { caller } from "@/lib/trpc-caller";

export type BetterAuthResponse = {
  code: string;
  message: string;
};

export type BetterAuthResponseError = {
  status: string;
  statusCode: number;
  headers: Headers;
  body: BetterAuthResponse;
};

export type BetterAuthResponseSignOut = {
  success: string;
};

export type BetterAuthResponseOAuth = {
  url: string;
  redirect: boolean;
};

export async function requireSession(request: Request) {
  return await auth.api.getSession({ headers: request.headers });
}

export async function requireAuthSession(request: Request) {
  const session = await requireSession(request);
  if (!session?.user.id) return { isAuthenticated: false, user: null };
  return { isAuthenticated: true, user: session.user };
}

export async function requireAuthUserData(request: Request) {
  const trpc = await caller(request);
  const session = await requireSession(request);

  if (!session?.user.id) {
    return { trpc, isAuthenticated: false, user: null };
  }

  const user = await trpc.auth.getUserComplete();
  const isAuthenticated = user !== null;

  return { trpc, isAuthenticated, user };
}

// Redirect to /signin if not authenticated
export async function requireAuthRedirectSignIn(request: Request) {
  const { isAuthenticated, user } = await requireAuthUserData(request);
  if (!isAuthenticated) return redirect(href("/signin"));
  if (!user) return redirect(href("/signin"));
  return { isAuthenticated, user };
}

// Redirect to /dashboard if authenticated
export async function requireAuthRedirectDashboard(request: Request) {
  const { isAuthenticated, user } = await requireAuthUserData(request);
  if (isAuthenticated) return redirect(href("/dashboard"));
  if (user) return redirect(href("/dashboard"));
  return { isAuthenticated, user };
}
