import { HomeHero } from "@/components/contents/home-hero";
import { caller } from "@/server/trpc-caller";
import type { Route } from "./+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  const api = await caller(request);
  const hello = await api.greeting.sayHello();
  return { hello };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { hello } = loaderData;

  return (
    <>
      <HomeHero hello={hello} />
    </>
  );
}
