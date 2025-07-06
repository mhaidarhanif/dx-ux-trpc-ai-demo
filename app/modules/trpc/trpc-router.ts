import { router } from "@/modules/trpc/trpc-config";
import { authRouter } from "@/server/auth";
import { exampleRouter } from "@/server/example";
import { greetingRouter } from "@/server/greeting";
import { userRouter } from "@/server/user";

export const appRouter = router({
  greeting: greetingRouter,
  example: exampleRouter,
  user: userRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
