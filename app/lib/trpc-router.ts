import { router } from "@/lib/trpc";
import { authRouter } from "@/server/routers/auth";
import { exampleRouter } from "@/server/routers/example";
import { greetingRouter } from "@/server/routers/greeting";
import { userRouter } from "@/server/routers/user";

export const appRouter = router({
  greeting: greetingRouter,
  example: exampleRouter,
  user: userRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
