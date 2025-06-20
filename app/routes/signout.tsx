import { Form, href, redirect } from "react-router";
import { ButtonLoading } from "@/components/shared/button-loading";
import { createTimer } from "@/lib/timer";
import { requireAuthTrue } from "@/server/auth-helper";
import { betterAuth } from "@/server/better-auth";
import type { Route } from "./+types/signout";

export async function loader({ request }: Route.LoaderArgs) {
  return requireAuthTrue(request);
}

export default function SignOutRoute({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <section className="space-y-4 p-8">
        <h1>Sign out account</h1>
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

  const { success } = await betterAuth.api.signOut({
    headers: request.headers,
  });

  await timer.delay();

  if (!success) return redirect(href("/dashboard"));
  return redirect(href("/signin"));
}
