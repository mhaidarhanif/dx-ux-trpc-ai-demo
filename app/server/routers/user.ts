import type { TRPCRouterRecord } from "@trpc/server";

import { procedure, protectedProcedure } from "@/server/trpc";

export const userRouter = {
  getPublicUsers: procedure.query(async ({ ctx }) => {
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
