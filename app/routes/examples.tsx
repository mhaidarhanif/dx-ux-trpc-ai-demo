import { ContentHeading } from "@/components/ui/content";
import { Examples } from "@/modules/example/components/example";
import { caller } from "@/modules/trpc/trpc-caller";
import type { Route } from "./+types/examples";

export const meta: Route.MetaFunction = () => [{ title: "Examples" }];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const trpc = await caller(request);
  return trpc.example.getExamples();
};

export default function ExamplesRoute({ loaderData }: Route.ComponentProps) {
  return (
    <section className="w-full max-w-6xl">
      <ContentHeading className="mb-10">Examples</ContentHeading>
      <Examples examples={loaderData} />
    </section>
  );
}
