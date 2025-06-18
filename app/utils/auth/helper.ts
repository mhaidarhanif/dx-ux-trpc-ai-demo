import { redirect } from "react-router";

import { auth } from "@/utils/auth/server";
import { caller } from "@/utils/trpc/server";

export async function requireAuth(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return {
      isAuthenticated: false,
      user: null,
    };
  }

  const api = await caller(request);
  const user = await api.greeting.user();
  const isAuthenticated = user !== null;

  return {
    isAuthenticated,
    user,
  };
}

// Redirect to /signin if not authenticated
export async function requireAuthTrue(request: Request) {
  const { isAuthenticated, user } = await requireAuth(request);

  if (!isAuthenticated) return redirect("/signin");

  return { isAuthenticated, user };
}

// Redirect to /user if authenticated
export async function requireAuthFalse(request: Request) {
  const { isAuthenticated } = await requireAuth(request);

  if (isAuthenticated) return redirect("/user");

  return { isAuthenticated };
}
