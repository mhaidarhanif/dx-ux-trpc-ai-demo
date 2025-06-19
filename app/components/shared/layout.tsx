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
  { to: href("/dashboard"), text: "Dashboard", auth: true },
];

export function Layout({
  hasTheme = false,
  isAuthenticated = false,
  children,
}: React.ComponentProps<"div"> & {
  hasTheme?: boolean;
  isAuthenticated?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sm:hidden">
        <NavbarMobile isAuthenticated={isAuthenticated} />
      </div>

      <div className="hidden sm:block">
        <NavbarDesktop isAuthenticated={isAuthenticated} />
      </div>

      <main className="flex-auto">{children}</main>

      <Footer hasTheme={hasTheme} />
    </div>
  );
}

export function NavbarMobile({ isAuthenticated = false }: { isAuthenticated?: boolean }) {
  return (
    <nav id="navbar-mobile" className={cn("p-2 sm:p-4")}>
      <Link to={href("/")} className="block">
        <Logo text="Dogokit Corgi" />
      </Link>

      <NavLinks items={navLinkItems} isAuthenticated={isAuthenticated} />
      <NavLinks items={authNavLinkItems} isAuthenticated={isAuthenticated} />
    </nav>
  );
}

export function NavbarDesktop({ isAuthenticated = false }: { isAuthenticated?: boolean }) {
  return (
    <nav
      id="navbar-desktop"
      className={cn(
        "p-2 sm:p-4",
        "grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-8",
        "sticky top-0 z-40 items-center justify-between bg-background"
      )}
    >
      <Link to={href("/")} className="block">
        <Logo text="Dogokit Corgi" />
      </Link>

      <div className="flex justify-center">
        <NavLinks items={navLinkItems} isAuthenticated={isAuthenticated} />
      </div>

      <div className="flex justify-end">
        <NavLinks items={authNavLinkItems} isAuthenticated={isAuthenticated} />
      </div>
    </nav>
  );
}

export function Footer({ hasTheme }: { hasTheme?: boolean }) {
  return (
    <footer className="space-y-4 p-4">
      {hasTheme && (
        <div className="flex justify-center gap-2">
          <ThemeSwitcherAction />
        </div>
      )}
      <p className="text-center text-sm">
        <span>&copy; {new Date().getFullYear()} Dogokit. </span>
        <Anchor href="https://github.com/dogokit/dogokit-corgi">Source Code on GitHub</Anchor>
      </p>
    </footer>
  );
}
