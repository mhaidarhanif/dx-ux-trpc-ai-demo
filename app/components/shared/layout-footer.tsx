import { Anchor } from "@/components/shared/anchor";
import { ThemeSwitcherAction } from "@/components/theme/theme-switcher-action";
import { siteConfig } from "@/config/site";

export function LayoutFooter({ hasTheme }: { hasTheme?: boolean }) {
  return (
    <footer className="space-y-4 p-2">
      {hasTheme && (
        <div className="flex justify-center gap-2">
          <ThemeSwitcherAction />
        </div>
      )}
      <div className="text-center text-muted-foreground text-sm">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}.
        </p>
        <p>
          <Anchor className="font-bold" href={siteConfig.links.github}>
            Source Code on GitHub
          </Anchor>
        </p>
      </div>
    </footer>
  );
}
