import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import { configPrismaCache } from "@/config/prisma-cache";
import { protectedProcedure } from "@/lib/trpc";

export const authRouter = {
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.user.id },
      ...configPrismaCache,
    });
    if (!user) throw new TRPCError({ code: "NOT_FOUND" });
    return user;
  }),

  getUserComplete: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.user.id },
      include: {
        accounts: true,
        passkeys: true,
        twofactors: true,
        sessions: true,
      },
      ...configPrismaCache,
    });
    if (!user) throw new TRPCError({ code: "NOT_FOUND" });
    return user;
  }),
} satisfies TRPCRouterRecord;
