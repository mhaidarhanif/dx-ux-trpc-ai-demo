import { useRouteLoaderData } from "react-router";
import type { loader as layoutRootLoader } from "@/layouts/layout-root";

export function useAuthUser() {
  const loaderData = useRouteLoaderData<typeof layoutRootLoader>("layout-root");
  if (!loaderData) return { isAuthenticated: false, user: null };

  return loaderData;
}
