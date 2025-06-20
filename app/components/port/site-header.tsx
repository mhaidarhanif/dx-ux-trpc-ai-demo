import { href, Link } from "react-router";
import { GitHubLink } from "@/components/port/github-link";
import { MainNav } from "@/components/port/main-nav";
import { MobileNav } from "@/components/port/mobile-nav";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="**:data-[slot=separator]:!h-4 3xl:fixed:container flex h-(--header-height) items-center gap-2">
          <MobileNav items={siteConfig.navItems} className="flex lg:hidden" />
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden size-8 lg:flex"
          >
            <Link to={href("/")}>
              <Logo />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
          </Button>
          <MainNav items={siteConfig.navItems} className="hidden lg:flex" />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <Separator
              orientation="vertical"
              className="ml-2 hidden lg:block"
            />
            <GitHubLink />
            <Separator orientation="vertical" />
          </div>
        </div>
      </div>
    </header>
  );
}
