import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { createTRPCContext } from "@/server/trpc";
import { trpcRouter } from "@/server/trpc-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return handleRequest(request);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return handleRequest(request);
};

function handleRequest(request: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: trpcRouter,
    createContext: () => createTRPCContext({ headers: request.headers }),
  });
}
