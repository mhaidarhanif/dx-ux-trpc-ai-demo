import { redirect } from "react-router";

import { auth } from "@/server/better-auth";
import { caller } from "@/server/trpc-caller";

export async function requireSession(request: Request) {
  return await auth.api.getSession({ headers: request.headers });
}

export async function requireAuth(request: Request) {
  const session = await requireSession(request);
  if (!session?.user?.id) return { isAuthenticated: false };
  return { isAuthenticated: true };
}

export async function requireUser(request: Request) {
  const session = await requireSession(request);
  if (!session?.user?.id) return { isAuthenticated: false, user: null };

  const api = await caller(request);
  const user = await api.user.getUser();
  const isAuthenticated = user !== null;

  return { isAuthenticated, user };
}

// Redirect to /signin if not authenticated
export async function requireAuthTrue(request: Request) {
  const { isAuthenticated } = await requireAuth(request);
  if (!isAuthenticated) return redirect("/signin");
  return { isAuthenticated };
}

// Redirect to /user if authenticated
export async function requireAuthFalse(request: Request) {
  const { isAuthenticated } = await requireAuth(request);
  if (isAuthenticated) return redirect("/user");
  return { isAuthenticated };
}
