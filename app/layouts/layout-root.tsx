import { Outlet } from "react-router";
import { Layout } from "@/components/shared/layout";
import { requireAuthSession } from "@/server/auth-helper";
import type { Route } from "./+types/layout-root";

export async function loader({ request }: Route.LoaderArgs) {
  return requireAuthSession(request);
}

export default function LayoutRoot({ loaderData }: Route.ComponentProps) {
  const { isAuthenticated, user } = loaderData;

  return (
    <Layout hasTheme isAuthenticated={isAuthenticated} user={user}>
      <Outlet />
    </Layout>
  );
}
