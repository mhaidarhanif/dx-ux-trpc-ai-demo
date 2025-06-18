import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { requireAuthFalse } from "@/lib/auth/helper";
import type { Route } from "./+types/signup";

export async function loader({ request }: Route.LoaderArgs) {
  return requireAuthFalse(request);
}

export default function SignUpRoute() {
  const signUp = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/user",
    });
  };

  return (
    <>
      <section className="p-10">
        <Button onClick={() => signUp()}>Sign Up with GitHub</Button>
      </section>
    </>
  );
}
