import type { TRPCRouterRecord } from "@trpc/server";

import { publicProcedure } from "@/server/trpc";

export const greetingRouter = {
  sayHello: publicProcedure.query(() => {
    return "Hello";
  }),

  getExamples: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.example.findMany({ cacheStrategy: { ttl: 60 } });
  }),
} satisfies TRPCRouterRecord;
