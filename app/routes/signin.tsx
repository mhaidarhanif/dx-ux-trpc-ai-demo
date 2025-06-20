import { parseWithZod } from "@conform-to/zod/v4";
import { href, redirect } from "react-router";
import { AuthCard } from "@/components/shared/auth-card";
import { AuthSignInSchema } from "@/modules/auth/schema";
import { requireAuthFalse } from "@/server/auth-helper";
import { type BetterAuthResponse, betterAuth } from "@/server/better-auth";
import type { Route } from "./+types/signin";

export async function loader({ request }: Route.LoaderArgs) {
  return requireAuthFalse(request);
}

export default function SignInRoute({ actionData }: Route.ComponentProps) {
  return (
    <>
      <AuthCard mode="signin" lastResult={actionData} />
    </>
  );
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: AuthSignInSchema });
  if (submission.status !== "success") return submission.reply();

  const response = await betterAuth.api.signInEmail({
    asResponse: true,
    body: submission.value,
  });

  const json: BetterAuthResponse = await response.json();

  console.log({ signIn: json });

  if (!response.ok) {
    return submission.reply({
      formErrors: [json.message || "Failed to sign in or authenticate"],
      // fieldErrors
    });
  }

  return redirect(href("/dashboard"), { headers: response.headers });
}
