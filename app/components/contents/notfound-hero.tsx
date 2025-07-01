import { href } from "react-router";
import { ButtonLink } from "@/components/shared/button-link";
import { FuzzyText } from "@/components/ui/text/fuzzy-text";
import { usePathname } from "@/lib/url";

export function NotFoundHero({
  baseIntensity = 0.05,
  enableHover = true,
  hoverIntensity = 0,
  color = "oklch(59% 0.034 73.32)",
}: {
  baseIntensity?: number;
  enableHover?: boolean;
  hoverIntensity?: number;
  color?: string;
}) {
  const pathname = usePathname();

  return (
    <section className="flex justify-center">
      <div className="my-10 space-y-8 text-center">
        <aside className="flex h-40 flex-col items-center gap-4 font-brand">
          <h1 className="hidden">404 Not Found</h1>
          <FuzzyText
            baseIntensity={baseIntensity}
            color={color}
            enableHover={enableHover}
            fontSize="8rem"
            hoverIntensity={hoverIntensity}
          >
            404
          </FuzzyText>
          <FuzzyText
            baseIntensity={baseIntensity}
            color={color}
            enableHover={enableHover}
            fontSize="3rem"
            hoverIntensity={hoverIntensity}
          >
            Not Found
          </FuzzyText>
        </aside>

        <p className="mb-8">
          Page <code className="px-1">{pathname}</code> is not found or does not
          exist.
        </p>

        <div>
          <ButtonLink to={href("/")}>Go to Home</ButtonLink>
        </div>
      </div>
    </section>
  );
}
