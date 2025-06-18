import { caller } from "@/lib/trpc/server";
import type { Route } from "./+types/examples";

export async function loader({ request }: Route.LoaderArgs) {
  const api = await caller(request);
  return await api.greeting.getExamples();
}

export default function Examples({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-12">
      <h1 className="mb-8 text-center font-bold text-3xl">All Examples</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {Array.isArray(loaderData) && loaderData.length > 0 ? (
          loaderData.map((example: { id: string; name: string }) => (
            <div
              key={example.id}
              className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-2 font-semibold text-xl">{example.name}</div>
              <div className="text-gray-500 text-xs">ID: {example.id}</div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No examples found.
          </div>
        )}
      </div>
    </div>
  );
}
