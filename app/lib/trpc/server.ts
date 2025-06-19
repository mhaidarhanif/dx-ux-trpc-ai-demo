import { appRouter } from "@/server/app-router";
import { createCallerFactory, createTRPCContext } from "@/server/trpc";

const createContext = (opts: { headers: Headers }) => {
  const headers = new Headers(opts.headers);
  headers.set("x-trpc-source", "server-loader");
  return createTRPCContext({
    headers,
  });
};

const createCaller = createCallerFactory(appRouter);

export const caller = async (request: Request) => createCaller(await createContext({ headers: request.headers }));
