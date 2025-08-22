import { HomeHero } from "@/components/contents/home-hero";
import { caller } from "@/modules/trpc/trpc-caller";
import type { Route } from "./+types/home";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const trpc = await caller(request);
  const result = await trpc.greeting.example();
  console.log(result);

  return null;
};

export default function HomeRoute(_: Route.ComponentProps) {
  return <HomeHero helloText={"Halo semuanya 👋"} />;
}
