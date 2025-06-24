import type { TRPCRouterRecord } from "@trpc/server";
import z from "zod";
import { publicProcedure } from "@/server/trpc";

export const exampleRouter = {
  getExamples: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.example.findMany({
      include: { items: true },
      cacheStrategy: { ttl: 120 },
    });
  }),

  getExampleSlug: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.db.example.findUnique({
        where: { slug: input },
        include: { items: true },
        cacheStrategy: { ttl: 120 },
      });
    }),
} satisfies TRPCRouterRecord;
