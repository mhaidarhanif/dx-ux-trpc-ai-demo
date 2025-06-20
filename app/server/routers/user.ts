import type { TRPCRouterRecord } from "@trpc/server";
import z from "zod";
import { protectedProcedure, publicProcedure } from "@/server/trpc";

export const userRouter = {
  getUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany({ cacheStrategy: { ttl: 60 } });
  }),

  getUserByUsername: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({ where: { username: input } });
    }),

  getUserByEmail: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({ where: { email: input } });
    }),
} satisfies TRPCRouterRecord;
