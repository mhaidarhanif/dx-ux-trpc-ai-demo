import { greeting } from "@/server/routers/greeting";
import { createTRPCRouter } from "@/server/trpc";

export const appRouter = createTRPCRouter({
  greeting,
});

export type AppRouter = typeof appRouter;
