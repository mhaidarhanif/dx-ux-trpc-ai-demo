import { AboutHero } from "@/components/contents/about-hero";
import type { Route } from "./+types/about";

export const meta: Route.MetaFunction = () => [{ title: "About" }];

export default function AboutRoute() {
  return (
    <>
      <AboutHero />
    </>
  );
}
