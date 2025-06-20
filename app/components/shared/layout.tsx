import { LayoutFooter } from "@/components/shared/layout-footer";
import { LayoutHeader } from "@/components/shared/layout-header";

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
