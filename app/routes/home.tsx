import { HomeHero } from "@/components/contents/home-hero";
import { caller } from "@/modules/trpc/trpc-caller";
import type { Route } from "./+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  const trpc = await caller(request);
  const helloText = await trpc.greeting.sayHello();
  return { helloText };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { helloText } = loaderData;

  return (
    <>
      <HomeHero helloText={helloText} />
    </>
  );
}
