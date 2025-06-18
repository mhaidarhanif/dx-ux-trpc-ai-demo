import { caller } from "@/utils/trpc/server";
import type { Route } from "./+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  const api = await caller(request);
  return await api.greeting.getExamples();
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="py-10">
      <article className="prose-config mx-auto">
        <h1>🐶Dogokit Corgi</h1>
        <p>
          <a href="https://github.com/dogokit/dogokit-corgi">Dogokit Corgi</a>{" "}
          is a full stack web app development kit. It is the implementation
          details of{" "}
          <a href="https://github.com/dogokit/dogokit-akita">Dogokit Akita</a>,
          mainly using:
        </p>
        <ul>
          <li>React v19</li>
          <li>React Router v7 Framework</li>
          <li>tRPC v11</li>
          <li>Prisma v6</li>
          <li>Tailwind CSS v4</li>
          <li>`shadcn/ui` with single `radix-ui`</li>
          <li>Zod v4 & Conform v1</li>
          <li>Better Auth v1</li>
          <li>Docker v28</li>
          <li>PostgreSQL v17</li>
          <li>Biome v2</li>
          <li>Vite v6</li>
          <li>Vitest v3</li>
          <li>React Email v4</li>
          <li>Resend</li>
          <li>Uploadcare or Cloudflare R2</li>
          <li>Polar</li>
          <li>Arcjet</li>
        </ul>
      </article>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(loaderData) && loaderData.length > 0 ? (
          loaderData.map((example: { id: string; name: string }) => (
            <div
              key={example.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700"
            >
              <div className="text-xl font-semibold mb-2">{example.name}</div>
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
