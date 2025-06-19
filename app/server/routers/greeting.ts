import type { TRPCRouterRecord } from "@trpc/server";
import z from "zod";

import { publicProcedure } from "@/server/trpc";

export const greetingRouter = {
  sayHello: publicProcedure.input(z.string().optional()).query(({ input }) => {
    if (!input) return "Hello";
    return `Hello, ${input}`;
  }),
} satisfies TRPCRouterRecord;
