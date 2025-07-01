import type { TRPCRouterRecord } from "@trpc/server";
import z from "zod/v4";

import { publicProcedure } from "@/lib/trpc";

export const greetingRouter = {
  sayHelloText: publicProcedure
    .input(z.string().optional())
    .query(({ ctx, input }) => {
      const userName = ctx.user?.name;
      if (userName) return `Hello, ${userName}!`;
      if (input) return `Hello, ${input}!`;
      return "Hello!";
    }),
} satisfies TRPCRouterRecord;
