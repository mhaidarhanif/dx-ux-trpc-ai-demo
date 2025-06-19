import { ButtonLink } from "@/components/shared/button-link";
import type { Route } from "./+types/404";

export const meta: Route.MetaFunction = () => {
  return [{ title: "404 Not Found - Dogokit Corgi" }];
};

export default function NotFoundRoute() {
  return (
    <div className="flex justify-center">
      <section className="my-10 text-center">
        <h1 className="mb-4 font-bold text-9xl">404</h1>
        <p className="mb-8">Page is not found or does not exist.</p>
        <ButtonLink to="/">Go to Home</ButtonLink>
      </section>
    </div>
  );
}
