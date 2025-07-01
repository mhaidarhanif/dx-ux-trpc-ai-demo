import { router } from "@/lib/trpc";
import { authRouter } from "@/routers/auth";
import { exampleRouter } from "@/routers/example";
import { greetingRouter } from "@/routers/greeting";
import { userRouter } from "@/routers/user";

export const appRouter = router({
  greeting: greetingRouter,
  example: exampleRouter,
  user: userRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
