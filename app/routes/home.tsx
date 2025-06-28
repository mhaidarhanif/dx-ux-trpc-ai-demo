import { HomeHero } from "@/components/contents/home-hero";
import { caller } from "@/server/trpc-caller";
import type { Route } from "./+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  const api = await caller(request);
  const helloText = await api.greeting.sayHelloText();
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
