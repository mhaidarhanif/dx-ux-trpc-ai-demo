import { Example } from "@/modules/example/components/example";
import { caller } from "@/modules/trpc/trpc-caller";
import type { Route } from "./+types/examples-slug";

export const meta: Route.MetaFunction = ({ data }) => [
  { title: data?.name || "Example" },
];

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const trpc = await caller(request);
  return trpc.example.getExampleSlug(params.slug);
};

export default function ExamplesSlugRoute({
  loaderData,
}: Route.ComponentProps) {
  return (
    <>
      <section className="w-full max-w-6xl">
        <Example example={loaderData} />
      </section>
    </>
  );
}
