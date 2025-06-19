import { greetingRouter } from "@/server/routers/greeting";
import { userRouter } from "@/server/routers/user";
import { router } from "@/server/trpc";

export const appRouter = router({
  greeting: greetingRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
