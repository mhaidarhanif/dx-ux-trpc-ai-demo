import { LayoutFooter } from "@/modules/layout/components/layout-footer";
import { LayoutHeader } from "@/modules/layout/components/layout-header";

export function Layout({
  hasTheme = false,
  children,
}: React.ComponentProps<"div"> & {
  hasTheme?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <LayoutHeader />
      <main className="flex-auto">{children}</main>
      <LayoutFooter hasTheme={hasTheme} />
    </div>
  );
}
