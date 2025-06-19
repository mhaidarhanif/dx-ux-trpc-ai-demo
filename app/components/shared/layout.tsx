import type { User } from "better-auth/types";
import { href, Link } from "react-router";
import { Anchor } from "@/components/shared/anchor";
import { Logo } from "@/components/shared/logo";
import { NavLinks } from "@/components/shared/navlinks";
import { ThemeSwitcherAction } from "@/components/theme/theme-switcher-action";
import { authNavLinkItems, navLinkItems } from "@/config/navigation";
import { cn } from "@/lib/utils";

interface SharedProps {
  hasTheme?: boolean;
  isAuthenticated?: boolean;
  user?: User | null;
}

export function Layout({
  hasTheme = false,
  isAuthenticated = false,
  user,
  children,
}: React.ComponentProps<"div"> & SharedProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sm:hidden">
        <NavbarMobile isAuthenticated={isAuthenticated} user={user} />
      </div>
      <div className="hidden sm:block">
        <NavbarDesktop isAuthenticated={isAuthenticated} user={user} />
      </div>

      <main className="flex-auto">{children}</main>

      <Footer hasTheme={hasTheme} />
    </div>
  );
}

export function NavbarMobile({ isAuthenticated = false }: SharedProps) {
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

export function NavbarDesktop({ isAuthenticated = false }: SharedProps) {
  return (
    <nav
      id="navbar-desktop"
      className={cn(
        "p-2 sm:p-4",
        "grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-8",
        "sticky top-0 z-40 items-center justify-between bg-background"
      )}
    >
      <Link to={href("/")} className="flex items-center gap-2">
        <Logo />
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

export function Footer({ hasTheme }: SharedProps) {
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
