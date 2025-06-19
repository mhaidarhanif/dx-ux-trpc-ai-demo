import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { auth } from "@/server/better-auth";
import { prisma } from "@/server/prisma";
import { trpcRouter } from "@/server/trpc-router";

export const createTRPCContext = async ({ headers }: { headers: Headers }) => {
  const authSession = await auth.api.getSession({ headers });

  const source = headers.get("x-trpc-source") ?? "unknown";

  const userEmail = authSession?.user.email;

  console.info(`🔹 tRPC Request: [${source}] by [${userEmail ?? "Anonymous"}]`);

  return {
    db: prisma,
    user: authSession?.user,
  };
};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  // const session = await auth.api.getSession({ headers: request.headers });

  if (!ctx.user?.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

const createContext = (opts: { headers: Headers }) => {
  const headers = new Headers(opts.headers);
  headers.set("x-trpc-source", "server-loader");
  return createTRPCContext({
    headers,
  });
};

const createCaller = createCallerFactory(trpcRouter);

export const caller = async (request: Request) => createCaller(await createContext({ headers: request.headers }));
