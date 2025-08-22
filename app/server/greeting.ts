import type { TRPCRouterRecord } from "@trpc/server";

import { publicProcedure } from "@/modules/trpc/trpc-config";

export const greetingRouter = {
  example: publicProcedure.query(() => {
    return "Example";
  }),
} satisfies TRPCRouterRecord;
