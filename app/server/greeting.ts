import type { TRPCRouterRecord } from "@trpc/server";

import { publicProcedure } from "@/modules/trpc/trpc-config";

export const greetingRouter = {
  example: publicProcedure.query(() => {
    return "Example";
  }),
  sayHello: publicProcedure.query(({ ctx }) => {
    const userName = ctx.user?.name || "Guest";
    return `Hello ${userName}! 👋`;
  }),
} satisfies TRPCRouterRecord;
