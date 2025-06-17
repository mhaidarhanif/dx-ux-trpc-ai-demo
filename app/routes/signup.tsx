import { Button } from "@/components/ui/button";
import { authClient } from "@/utils/auth/client";

export default function SignUpRoute() {
  const signUp = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/user",
    });
  };

  return (
    <div className="flex items-center justify-center">
      <section className="p-10">
        <Button onClick={() => signUp()}>Sign Up with GitHub</Button>
      </section>
    </div>
  );
}
