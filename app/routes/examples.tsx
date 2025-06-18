import { Examples } from "@/components/data/examples";
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
        <h1 className="mb-8 text-center font-bold text-3xl">All Examples</h1>
        <Examples examples={examples} />
      </section>
    </>
  );
}
