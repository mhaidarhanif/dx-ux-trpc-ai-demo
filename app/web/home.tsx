import { HomeHero } from "@/components/contents/home-hero";
import { caller } from "@/modules/trpc/trpc-caller";
import type { Route } from "./+types/home";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const trpc = await caller(request);
  const helloMessage = await trpc.greeting.sayHello();

  return { helloMessage };
};

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  return <HomeHero helloText={loaderData.helloMessage} />;
}
