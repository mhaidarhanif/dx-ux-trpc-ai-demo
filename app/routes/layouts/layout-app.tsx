import { Outlet } from "react-router";
import { Layout } from "@/modules/layout/components/layout";

export default function LayoutAppRoute() {
  return (
    <Layout hasTheme>
      <Outlet />
    </Layout>
  );
}
