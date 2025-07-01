import { configSite } from "@/lib/config/site";
import { cn } from "@/lib/utils";
import { LogoNavigationLink } from "@/modules/brand/components/logo";
import { NavigationDesktopLinks } from "@/modules/navigation/components/navigation-desktop-links";
import { UserDropdownMenu } from "@/modules/user/components/user-dropdown-menu";

export function NavigationDesktop() {
  return (
    <nav
      className={cn(
        "w-full rounded-full border bg-background px-4 py-2",
        "grid grid-cols-1 items-center gap-2 sm:grid-cols-3 sm:gap-8"
      )}
      id="navigation-desktop"
    >
      <LogoNavigationLink />

      <div className="flex justify-center gap-2">
        <NavigationDesktopLinks items={configSite.navItems} />
      </div>

      <div className="flex justify-end gap-2">
        <NavigationDesktopLinks items={configSite.navAuthItems} />
        <UserDropdownMenu />
      </div>
    </nav>
  );
}
