import { Anchor } from "@/components/shared/anchor";
import { ThemeSwitcherAction } from "@/components/theme/theme-switcher-action";

export function LayoutFooter({ hasTheme }: { hasTheme?: boolean }) {
  return (
    <footer className="space-y-4">
      {hasTheme && (
        <div className="flex justify-center gap-2">
          <ThemeSwitcherAction />
        </div>
      )}
      <p className="text-center text-sm">
        <span>&copy; {new Date().getFullYear()} Dogokit. </span>
        <Anchor href="https://github.com/dogokit/dogokit-corgi">
          Source Code on GitHub
        </Anchor>
      </p>
    </footer>
  );
}
