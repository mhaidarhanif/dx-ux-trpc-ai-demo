import { href, Link } from "react-router";
import { Logo } from "@/components/shared/logo";
import { NavigationLinks } from "@/components/shared/navigation-links";
import { authNavLinkItems, navLinkItems } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function NavigationDesktop() {
  return (
    <nav
      id="navbar-desktop"
      className={cn(
        "grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-8",
        "sticky top-0 z-40 w-full bg-background"
      )}
    >
      <Link to={href("/")} className="flex items-center gap-2">
        <Logo />
      </Link>

      <div className="flex justify-center">
        <NavigationLinks items={navLinkItems} />
      </div>

      <div className="flex justify-end">
        <NavigationLinks items={authNavLinkItems} />
      </div>
    </nav>
  );
}
