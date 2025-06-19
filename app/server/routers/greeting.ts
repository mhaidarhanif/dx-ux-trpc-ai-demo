import type { TRPCRouterRecord } from "@trpc/server";
import z from "zod";

import { publicProcedure } from "@/server/trpc";

export const greetingRouter = {
  sayHello: publicProcedure.input(z.string().optional()).query(({ ctx, input }) => {
    const userName = ctx.user?.name;

    if (!input && userName) return `Hello, ${userName}`;
    if (input) return `Hello, ${input}`;
    return "Hello";
  }),
} satisfies TRPCRouterRecord;
