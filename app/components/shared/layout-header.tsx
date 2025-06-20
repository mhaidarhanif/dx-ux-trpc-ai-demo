import { NavigationDesktop } from "@/components/shared/navigation-desktop";
import { NavigationMobile } from "@/components/shared/navigation-mobile";

export function LayoutHeader() {
  return (
    <header className="px-4 py-2">
      <div id="navigation-mobile" className="flex md:hidden">
        <NavigationMobile />
      </div>
      <div id="navigation-desktop" className="hidden md:flex">
        <NavigationDesktop />
      </div>
    </header>
  );
}
