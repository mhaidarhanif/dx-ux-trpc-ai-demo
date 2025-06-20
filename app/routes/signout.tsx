import { Form, href, redirect } from "react-router";
import { ButtonLoading } from "@/components/shared/button-loading";
import { createTimer } from "@/lib/timer";
import { requireAuthTrue } from "@/server/auth-helper";
import {
  type BetterAuthResponseSignOut,
  betterAuth,
} from "@/server/better-auth";
import type { Route } from "./+types/signout";

export async function loader({ request }: Route.LoaderArgs) {
  return requireAuthTrue(request);
}

export default function SignOutRoute({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <section className="space-y-4 p-8">
        <h1 className="text-2xl">Sign out account</h1>
        <p>
          @{loaderData.user?.username} ({loaderData.user?.email})
        </p>
        <Form method="post" action={href("/signout")}>
          <ButtonLoading type="submit" submittingText="Signing Out...">
            Sign Out
          </ButtonLoading>
        </Form>
      </section>
    </>
  );
}

export async function action({ request }: Route.ActionArgs) {
  const timer = createTimer();

  const response = await betterAuth.api.signOut({
    asResponse: true,
    headers: request.headers,
  });

  const json: BetterAuthResponseSignOut = await response.json();

  await timer.delay();
  if (!json.success) return redirect(href("/dashboard"));
  return redirect(href("/signin"));
}
