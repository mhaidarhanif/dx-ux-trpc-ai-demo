import type { Route } from "./+types/404";

export const meta: Route.MetaFunction = () => {
  return [{ title: "404 Not Found - Dogokit Corgi" }];
};

export default function NotFoundRoute() {
  return (
    <div>
      <h1>404 Not Found</h1>
    </div>
  );
}
