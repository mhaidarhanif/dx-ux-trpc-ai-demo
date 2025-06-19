import { greetingRouter } from "@/server/routers/greeting";
import { userRouter } from "@/server/routers/user";
import { createTRPCRouter } from "@/server/trpc";

export const appRouter = createTRPCRouter({
  greeting: greetingRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
