import { Form, href } from "react-router";
import { ButtonCancel } from "@/components/buttons/button-cancel";
import { ButtonLoading } from "@/components/buttons/button-loading";
import { Flex } from "@/components/shared/flex";
import {
  actionSignOut,
  requireAuthRedirectSignIn,
} from "@/modules/auth/helpers";
import type { Route } from "./+types/signout";

export function loader({ request }: Route.LoaderArgs) {
  return requireAuthRedirectSignIn(request);
}

export default function SignOutRoute({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  const username = user?.username ? `@${user?.username}` : "@anonymous";
  const email = user?.email || "Anonymous";

  return (
    <>
      <section className="max-w-md space-y-4 p-8">
        <h1 className="text-2xl">Sign out {username}?</h1>
        <p>
          We'll sign out account {email}. You can always log back in at any
          time.
        </p>
        {/* <p>
          (Soon) If you just want to switch accounts without signing out the
          currently active account, you can do that by adding another account.
        </p> */}
        <Form action={href("/signout")} method="post">
          <Flex>
            <ButtonLoading submittingText="Signing Out..." type="submit">
              Sign Out {username}
            </ButtonLoading>
            <ButtonCancel />
          </Flex>
        </Form>
      </section>
    </>
  );
}

export function action({ request }: Route.ActionArgs) {
  return actionSignOut(request);
}
