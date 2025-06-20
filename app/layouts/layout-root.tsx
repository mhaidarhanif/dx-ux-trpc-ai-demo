import { useEffect } from "react";
import { Outlet } from "react-router";
import { Layout } from "@/components/shared/layout";
import { useAuthUser } from "@/hooks/use-auth-user";
import { requireAuthSession } from "@/server/auth-helper";
import type { Route } from "./+types/layout-root";

export async function loader({ request }: Route.LoaderArgs) {
  return requireAuthSession(request);
}

export default function LayoutRoot({ loaderData }: Route.ComponentProps) {
  const { isAuthenticated, user } = loaderData;
  const [_, setAuthUser] = useAuthUser();

  useEffect(() => {
    setAuthUser({ isAuthenticated, user });
  }, [isAuthenticated, user, setAuthUser]);

  return (
    <Layout hasTheme>
      <Outlet />
    </Layout>
  );
}
