import type { TRPCRouterRecord } from "@trpc/server";

import { protectedProcedure } from "@/server/trpc";

export const authRouter = {
  getUser: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findFirst({
      where: { id: ctx.user.id },
      cacheStrategy: { ttl: 10 },
    });
  }),

  getUserComplete: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findFirst({
      where: { id: ctx.user.id },
      cacheStrategy: { ttl: 10 },
      include: {
        sessions: true,
        accounts: true,
        twofactors: true,
        passkeys: true,
      },
    });
  }),
} satisfies TRPCRouterRecord;
