import type { TRPCRouterRecord } from "@trpc/server";

import { procedure } from "@/server/trpc";

export const greetingRouter = {
  sayHello: procedure.query(() => {
    return "Hello";
  }),

  getExamples: procedure.query(async ({ ctx }) => {
    return await ctx.db.example.findMany({ cacheStrategy: { ttl: 60 } });
  }),
} satisfies TRPCRouterRecord;
