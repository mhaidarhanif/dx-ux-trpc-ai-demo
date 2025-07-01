import { Example } from "@/components/shared/example";
import { caller } from "@/lib/trpc-caller";
import type { Route } from "./+types/slug";

export async function loader({ request, params }: Route.LoaderArgs) {
  const api = await caller(request);
  return api.example.getExampleSlug(params.slug);
}

export default function ExampleSlugRoute({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <section className="w-full max-w-6xl">
        <Example example={loaderData} />
      </section>
    </>
  );
}
