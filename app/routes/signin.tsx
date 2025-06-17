import { Button } from "@/components/ui/button";
import { authClient } from "@/utils/auth/client";
import { requireAuthFalse } from "@/utils/auth/helper";
import type { Route } from "./+types/signin";

export async function loader({ request }: Route.LoaderArgs) {
  return requireAuthFalse(request);
}

export default function SignIn() {
  const signIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/user",
    });
  };

  return (
    <div className="flex items-center justify-center">
      <section className="p-10">
        <Button onClick={() => signIn()}>Sign in with GitHub</Button>
      </section>
    </div>
  );
}
