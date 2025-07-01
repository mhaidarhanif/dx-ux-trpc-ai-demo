import { Anchor } from "@/components/shared/anchor";
import { configSite } from "@/lib/config/site";
import { ThemeSwitcherAction } from "@/modules/theme/components/theme-switcher-action";

export function LayoutFooter({ hasTheme }: { hasTheme?: boolean }) {
  return (
    <footer className="space-y-4 p-4">
      {hasTheme && (
        <div className="flex justify-center gap-2">
          <ThemeSwitcherAction />
        </div>
      )}
      <div className="text-center text-muted-foreground text-sm">
        <p>
          &copy; {new Date().getFullYear()} {configSite.name}.
        </p>
        <p>
          <Anchor className="font-bold" href={configSite.links.github}>
            Source Code on GitHub
          </Anchor>
        </p>
      </div>
    </footer>
  );
}
