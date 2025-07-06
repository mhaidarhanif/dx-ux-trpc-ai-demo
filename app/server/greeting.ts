import type { TRPCRouterRecord } from "@trpc/server";
import z from "zod/v4";

import { publicProcedure } from "@/modules/trpc/trpc-config";

export const greetingRouter = {
  sayHello: publicProcedure
    .input(z.string().optional())
    .query(({ ctx, input }) => {
      const userName = ctx.user?.name;
      if (userName) return `Hello, ${userName}!`;
      if (input) return `Hello, ${input}!`;
      return "Hello!";
    }),
} satisfies TRPCRouterRecord;
