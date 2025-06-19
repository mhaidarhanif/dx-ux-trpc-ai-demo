import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { betterAuth } from "@/server/better-auth";
import { prisma } from "@/server/prisma";

export const createTRPCContext = async ({ headers }: { headers: Headers }) => {
  const authSession = await betterAuth.api.getSession({ headers });

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

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user?.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
