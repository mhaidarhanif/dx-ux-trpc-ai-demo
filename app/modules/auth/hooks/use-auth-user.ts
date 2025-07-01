import { useRouteLoaderData } from "react-router";

import type { loader } from "@/root";

export function useAuthUser() {
  const loaderData = useRouteLoaderData<typeof loader>("root");
  if (!loaderData) return { isAuthenticated: false, user: null };
  return loaderData;
}
