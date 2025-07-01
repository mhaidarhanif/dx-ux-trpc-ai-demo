import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4-mini";
import { configPrismaCache } from "@/lib/config/prisma";
import {
  protectedProcedure,
  publicProcedure,
} from "@/modules/trpc/trpc-config";

const configPrismaUser = {
  omit: {
    email: true,
    emailVerified: true,
    phone: true,
    phoneNumber: true,
    phoneNumberVerified: true,
  },
};

export const userRouter = {
  getUsers: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      ...configPrismaUser,
      orderBy: { createdAt: "asc" },
      ...configPrismaCache,
    });
  }),

  getUserByUsername: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: { username: input },
        ...configPrismaUser,
        ...configPrismaCache,
      });
    }),

  getUserByEmail: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.user.findUnique({ where: { email: input } });
    }),
} satisfies TRPCRouterRecord;
