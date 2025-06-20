import { NavigationDesktop } from "@/components/shared/navigation-desktop";
import { NavigationMobile } from "@/components/shared/navigation-mobile";

export function LayoutHeader() {
  return (
    <header className="sticky top-0 z-40">
      <div id="navigation-desktop" className="hidden p-4 md:flex">
        <NavigationDesktop />
      </div>

      <div id="navigation-mobile" className="flex md:hidden">
        <NavigationMobile />
      </div>
    </header>
  );
}
