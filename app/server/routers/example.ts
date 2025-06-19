import type { TRPCRouterRecord } from "@trpc/server";

import { publicProcedure } from "@/server/trpc";

export const exampleRouter = {
  getExamples: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.example.findMany({
      include: { items: true },
      cacheStrategy: { ttl: 60 },
    });
  }),
} satisfies TRPCRouterRecord;
