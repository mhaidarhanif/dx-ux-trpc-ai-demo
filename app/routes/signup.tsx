import { parseWithZod } from "@conform-to/zod/v4";
import { href, redirect } from "react-router";
import { AuthCard } from "@/components/shared/auth-card";
import { createTimer } from "@/lib/timer";
import { AuthSignUpSchema } from "@/modules/auth/schema";
import { requireAuthFalse } from "@/server/auth-helper";
import { type BetterAuthResponse, betterAuth } from "@/server/better-auth";
import type { Route } from "./+types/signin";

export async function loader({ request }: Route.LoaderArgs) {
  return requireAuthFalse(request);
}

export default function SignUpRoute({ actionData }: Route.ComponentProps) {
  return (
    <>
      <AuthCard mode="signup" lastResult={actionData} />
    </>
  );
}

export async function action({ request }: Route.ActionArgs) {
  const timer = createTimer();

  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: AuthSignUpSchema });
  if (submission.status !== "success") return submission.reply();

  const response = await betterAuth.api.signUpEmail({
    asResponse: true,
    body: {
      ...submission.value,
      firstName: submission.value.name.split(" ")[0],
      lastName: submission.value.name.split(" ")[1],
    },
  });

  const json: BetterAuthResponse = await response.json();

  console.log({ signUp: json });

  if (!response.ok) {
    return submission.reply({
      formErrors: [json.message || "Failed to sign up or create new account"],
      // fieldErrors
    });
  }

  await timer.delay();

  return redirect(href("/signin"), { headers: response.headers });
}
