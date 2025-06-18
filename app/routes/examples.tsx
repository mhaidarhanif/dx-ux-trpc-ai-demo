import { Examples } from "@/components/shared/examples";
import { ContentHeadingPage } from "@/components/ui/content";
import { caller } from "@/lib/trpc/server";
import type { Route } from "./+types/examples";

export async function loader({ request }: Route.LoaderArgs) {
  const api = await caller(request);
  const examples = await api.greeting.getExamples();
  return { examples };
}

export default function ExamplesRoute({ loaderData }: Route.ComponentProps) {
  const { examples } = loaderData;

  return (
    <>
      <section>
        <ContentHeadingPage className="mb-10">Examples</ContentHeadingPage>
        <Examples examples={examples} />
      </section>
    </>
  );
}
