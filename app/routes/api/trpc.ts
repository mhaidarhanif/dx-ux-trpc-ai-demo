import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

import { appRouter } from "@/server/main";
import { createTRPCContext } from "@/server/trpc";

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
    router: appRouter,
    createContext: () => createTRPCContext({ headers: request.headers }),
  });
}
