import { createCallerFactory, createTRPCContext } from "@/lib/trpc";
import { appRouter } from "@/lib/trpc-router";

const createContext = (opts: { headers: Headers }) => {
  const headers = new Headers(opts.headers);
  headers.set("x-trpc-source", "server-loader");
  return createTRPCContext({
    headers,
  });
};

const createCaller = createCallerFactory(appRouter);

export const caller = async (request: Request) =>
  createCaller(await createContext({ headers: request.headers }));
