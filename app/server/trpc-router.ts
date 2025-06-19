import { greetingRouter } from "@/server/routers/greeting";
import { userRouter } from "@/server/routers/user";
import { createTRPCRouter } from "@/server/trpc";

export const trpcRouter = createTRPCRouter({
  greeting: greetingRouter,
  user: userRouter,
});

export type TRPCRouter = typeof trpcRouter;
