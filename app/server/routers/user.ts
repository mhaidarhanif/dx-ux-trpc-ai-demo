import type { TRPCRouterRecord } from "@trpc/server";

import { protectedProcedure, publicProcedure } from "@/server/trpc";

export const userRouter = {
  getPublicUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.example.findMany({ cacheStrategy: { ttl: 60 } });
  }),

  getAuthUserComplete: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findFirst({
      where: { id: ctx.user?.id },
      include: {
        sessions: true,
        accounts: true,
      },
      cacheStrategy: { ttl: 10 },
    });
  }),
} satisfies TRPCRouterRecord;
