import { NavigationDesktop } from "@/components/shared/navigation-desktop";
import { NavigationMobile } from "@/components/shared/navigation-mobile";

export function LayoutHeader() {
  return (
    <header className="p-2 sm:p-4">
      <div className="flex md:hidden">
        <NavigationMobile />
      </div>
      <div className="hidden md:flex">
        <NavigationDesktop />
      </div>
    </header>
  );
}
