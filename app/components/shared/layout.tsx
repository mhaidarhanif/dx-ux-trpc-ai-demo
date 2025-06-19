import { href, Link } from "react-router";

import { Anchor } from "@/components/shared/anchor";
import { Logo } from "@/components/shared/logo";
import { type NavLinkItem, NavLinks } from "@/components/shared/navlinks";
import { ThemeSwitcherAction } from "@/components/theme/theme-switcher-action";
import { cn } from "@/lib/utils";

const navLinkItems: NavLinkItem[] = [
  { to: href("/"), text: "Home" },
  { to: href("/about"), text: "About" },
  { to: href("/examples"), text: "Examples" },
  { to: "/404", text: "404" },
];

const authNavLinkItems: NavLinkItem[] = [
  { to: href("/signup"), text: "Sign Up", auth: false },
  { to: href("/signin"), text: "Sign In", auth: false },
  { to: href("/signout"), text: "Sign Out", auth: true },
  { to: href("/user"), text: "User", auth: true },
];

export default function LayoutRoot({
  hasTheme = false,
  isAuthenticated = false,
  children,
}: React.ComponentProps<"div"> & {
  hasTheme?: boolean;
  isAuthenticated?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <nav
        className={cn(
          "flex",
          // "hidden lg:flex",
          "sticky top-0 z-40 items-center justify-between gap-8 bg-background p-2 sm:p-4"
        )}
      >
        <Link to={href("/")} className="block">
          <Logo classNameText="font-black font-brand" />
        </Link>

        <NavLinks items={navLinkItems} isAuthenticated={isAuthenticated} />

        <NavLinks items={authNavLinkItems} isAuthenticated={isAuthenticated} />
      </nav>

      <main className="flex-auto">{children}</main>

      <footer className="space-y-4 p-4">
        {hasTheme && (
          <div className="flex justify-center gap-2">
            <ThemeSwitcherAction />
          </div>
        )}
        <p className="text-center text-sm">
          <span>&copy; {new Date().getFullYear()} Dogokit. </span>
          <Anchor href="https://github.com/dogokit/dogokit-corgi">
            Source Code on GitHub
          </Anchor>
        </p>
      </footer>
    </div>
  );
}
