import { greetingRouter } from "./routers/greeting";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  greeting: greetingRouter,
});

export type AppRouter = typeof appRouter;
