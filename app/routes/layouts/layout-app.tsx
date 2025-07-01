import { Outlet } from "react-router";
import { Layout } from "@/components/shared/layout";

export default function LayoutApp() {
  return (
    <Layout hasTheme>
      <Outlet />
    </Layout>
  );
}
