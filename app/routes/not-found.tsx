import { NotFoundHero } from "@/components/contents/notfound-hero";
import type { Route } from "./+types/not-found";

export const meta: Route.MetaFunction = () => {
  return [{ title: "404 Not Found" }];
};

export default function NotFoundRoute() {
  return (
    <>
      <NotFoundHero />
    </>
  );
}
