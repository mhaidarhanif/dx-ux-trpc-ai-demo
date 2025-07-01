import { useEffect } from "react";
import { href, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { authClient } from "@/modules/auth/better-auth-client";

export function ButtonAuthPasskey({
  textAction = "Sign In",
}: {
  textAction?: string;
}) {
  const navigate = useNavigate();

  const signInPasskey = async () => {
    await authClient.signIn.passkey({
      fetchOptions: {
        onSuccess: () => navigate(href("/dashboard")),
      },
    });
  };

  useEffect(() => {
    if (!PublicKeyCredential.isConditionalMediationAvailable?.()) {
      return;
    }

    authClient.signIn.passkey({ autoFill: true });
  }, []);

  return (
    <Button className="w-full" onClick={signInPasskey} variant="secondary">
      <Icons.KeyRound />
      <span>{textAction} with Passkey</span>
    </Button>
  );
}
