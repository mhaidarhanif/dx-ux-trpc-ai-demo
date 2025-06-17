import { Button } from "@/components/ui/button";
import { authClient } from "@/utils/auth/client";

export default function SignIn() {
  const signIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/user",
    });
  };

  return (
    <div className="px-6 sm:px-0 max-w-sm min-h-screen mx-auto flex items-center justify-center">
      <Button onClick={() => signIn()}>Sign in with GitHub</Button>
    </div>
  );
}
