import { greetingRouter } from "@/server/routers/greeting";
import { createTRPCRouter } from "@/server/trpc";

export const appRouter = createTRPCRouter({
  greeting: greetingRouter,
});

export type AppRouter = typeof appRouter;
