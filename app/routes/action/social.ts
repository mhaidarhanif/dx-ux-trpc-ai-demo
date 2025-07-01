import { parseWithZod } from "@conform-to/zod/v4";
import { redirect } from "react-router";
import type { BetterAuthResponseOAuth } from "@/lib/auth-helper";
import { auth } from "@/lib/better-auth";
import { createTimer } from "@/lib/timer";
import { AuthSocialSchema } from "@/schemas/auth";
import type { Route } from "./+types/social";

export async function action({ request }: Route.ActionArgs) {
  const timer = createTimer();

  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: AuthSocialSchema });
  if (submission.status !== "success") return submission.reply();

  const response = await auth.api.signInSocial({
    asResponse: true,
    headers: request.headers,
    body: {
      provider: submission.value.provider,
      callbackURL: "/dashboard",
    },
  });
  const json: BetterAuthResponseOAuth = await response.json();

  if (!response.ok) {
    return submission.reply({
      formErrors: [`Failed to continue with ${submission.value.provider}`],
    });
  }

  await timer.delay();
  if (!(json.redirect && json.url)) return null;
  return redirect(json.url);
}
