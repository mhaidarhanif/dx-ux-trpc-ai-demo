import { Examples } from "@/components/shared/examples";
import { ContentHeading } from "@/components/ui/content";
import { caller } from "@/server/trpc-caller";
import type { Route } from "./+types/examples";

export async function loader({ request }: Route.LoaderArgs) {
  const api = await caller(request);
  const examples = await api.example.getExamples();
  return { examples };
}

export default function ExamplesRoute({ loaderData }: Route.ComponentProps) {
  const { examples } = loaderData;

  return (
    <>
      <section className="w-full max-w-6xl">
        <ContentHeading className="mb-10">Examples</ContentHeading>
        <Examples examples={examples} />
      </section>
    </>
  );
}
