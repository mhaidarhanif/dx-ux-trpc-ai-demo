import type { TRPCRouterRecord } from "@trpc/server";

import { protectedProcedure, publicProcedure } from "@/server/trpc";

export const greeting = {
  getExamples: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.example.findMany({ cacheStrategy: { ttl: 60 } });
  }),

  user: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findFirst({
      where: { id: ctx.user?.id },
      include: {
        sessions: true,
        accounts: true,
      },
    });
  }),
} satisfies TRPCRouterRecord;
