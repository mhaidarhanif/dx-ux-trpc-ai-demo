import type { TRPCRouterRecord } from "@trpc/server";

import { publicProcedure } from "@/server/trpc";

export const userRouter = {
  getUser: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findFirst();
  }),

  getUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany({ cacheStrategy: { ttl: 60 } });
  }),
} satisfies TRPCRouterRecord;
