import { caller } from "@/lib/trpc/server";
import type { Route } from "./+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  const api = await caller(request);
  return await api.greeting.getExamples();
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-20 py-10">
      <section className="container max-w-xl">
        <h1 className="font-brand text-3xl">🐶Dogokit Corgi</h1>

        <article className="prose-config">
          <p className="font-brand text-xl">
            <a href="https://github.com/dogokit/dogokit-corgi">Dogokit Corgi</a>{" "}
            is a full stack web app kit for quick development. It is the
            implementation details of{" "}
            <a href="https://github.com/dogokit/dogokit-akita">Dogokit Akita</a>
            , mainly using:
          </p>
          <ul>
            <li>React</li>
            <li>React Router Framework</li>
            <li>tRPC</li>
            <li>Prisma</li>
            <li>Tailwind CSS and shadcn/ui</li>
            <li>Zod & Conform</li>
            <li>Better Auth</li>
            <li>
              and{" "}
              <a href="https://github.com/dogokit/dogokit-corgi">much more</a>
            </li>
          </ul>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
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
      </section>
    </div>
  );
}
