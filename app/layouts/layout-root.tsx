import { Outlet } from "react-router";
import { Layout } from "@/components/shared/layout";
import { requireAuth } from "@/server/auth";
import type { Route } from "./+types/layout-root";

export async function loader({ request }: Route.LoaderArgs) {
  return requireAuth(request);
}

export default function LayoutRoot({ loaderData }: Route.ComponentProps) {
  const { isAuthenticated } = loaderData;

  return (
    <Layout hasTheme isAuthenticated={isAuthenticated}>
      <Outlet />
    </Layout>
  );
}
