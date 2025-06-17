import type { TRPCRouterRecord } from "@trpc/server";
import { db } from "@/server/db";
import { protectedProcedure, publicProcedure } from "@/server/trpc";

export const greetingRouter = {
  hello: publicProcedure.query(async () => {
    return await db.example.findMany({
      cacheStrategy: { ttl: 60 },
    });
  }),

  user: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: { id: ctx.user?.id },
    });

    return user;
  }),
} satisfies TRPCRouterRecord;
