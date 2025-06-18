import { href, Outlet } from "react-router";

import { type NavLinkItem, NavLinks } from "@/components/logic/navlinks";
import { ThemeSwitcherAction } from "@/components/shared/theme-switcher-action";
import { requireAuth } from "@/lib/auth/helper";
import { cn } from "@/lib/utils";
import type { Route } from "./+types/layout-root";

export async function loader({ request }: Route.LoaderArgs) {
  return requireAuth(request);
}

const navLinkItems: NavLinkItem[] = [
  { to: href("/"), text: "Home" },
  { to: href("/about"), text: "About" },
  { to: href("/examples"), text: "Examples" },
];

const authNavLinkItems: NavLinkItem[] = [
  { to: href("/signup"), text: "Sign Up", auth: false },
  { to: href("/signin"), text: "Sign In", auth: false },
  { to: href("/signout"), text: "Sign Out", auth: true },
  { to: href("/user"), text: "User", auth: true },
];

export default function LayoutRoot({ loaderData }: Route.ComponentProps) {
  const { isAuthenticated } = loaderData;

  return (
    <div className="flex min-h-screen flex-col">
      <nav
        className={cn(
          "sticky top-0 z-40 hidden items-center justify-between gap-4 bg-background p-4 sm:p-6 lg:flex"
        )}
      >
        <NavLinks items={navLinkItems} isAuthenticated={isAuthenticated} />
        <NavLinks items={authNavLinkItems} isAuthenticated={isAuthenticated} />
      </nav>

      <main className="flex-auto">
        <Outlet />
      </main>

      <footer className="space-y-4 p-4">
        <div className="flex justify-center gap-2">
          <ThemeSwitcherAction />
        </div>
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Dogokit
        </p>
      </footer>
    </div>
  );
}
