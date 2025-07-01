import { Example } from "@/components/shared/example";
import { caller } from "@/lib/trpc-caller";
import type { Route } from "./+types/slug";

export async function loader({ request, params }: Route.LoaderArgs) {
  const trpc = await caller(request);
  return trpc.example.getExampleSlug(params.slug);
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
