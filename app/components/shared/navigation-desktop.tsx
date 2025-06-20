import { href, Link } from "react-router";
import { Logo } from "@/components/shared/logo";
import { NavigationDesktopLinks } from "@/components/shared/navigation-desktop-links";
import { configSite } from "@/config/site";
import { cn } from "@/lib/utils";

export function NavigationDesktop() {
  return (
    <nav
      id="navigation-desktop"
      className={cn(
        "w-full rounded-full border bg-background px-4 py-2",
        "grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-8"
      )}
    >
      <Link to={href("/")} className="flex items-center gap-2">
        <Logo />
      </Link>

      <div className="flex justify-center">
        <NavigationDesktopLinks items={configSite.navItems} />
      </div>

      <div className="flex justify-end">
        <NavigationDesktopLinks items={configSite.navAuthItems} />
      </div>
    </nav>
  );
}
