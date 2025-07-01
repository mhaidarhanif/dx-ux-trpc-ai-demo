import { HomeHero } from "@/components/contents/home-hero";
import { caller } from "@/modules/trpc/trpc-caller";
import type { Route } from "./+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  const trpc = await caller(request);
  return trpc.greeting.sayHello();
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <HomeHero helloText={loaderData} />
    </>
  );
}
