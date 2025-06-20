import { parseWithZod } from "@conform-to/zod/v4";
import { redirect } from "react-router";

import { createTimer } from "@/lib/timer";
import { AuthSocialSchema } from "@/modules/auth/schema";
import { betterAuth } from "@/server/better-auth";
import type { Route } from "./+types/social";

export async function action({ request }: Route.ActionArgs) {
  const timer = createTimer();

  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: AuthSocialSchema });
  if (submission.status !== "success") return submission.reply();

  const authSocialResponse = await betterAuth.api.signInSocial({
    body: {
      provider: submission.value.provider,
      callbackURL: "/dashboard",
    },
  });

  await timer.delay();

  if (!authSocialResponse.redirect || !authSocialResponse.url) {
    return null;
  }

  return redirect(authSocialResponse.url);
}
