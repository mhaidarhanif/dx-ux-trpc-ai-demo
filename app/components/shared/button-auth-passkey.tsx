import { IconKeyFilled } from "@tabler/icons-react";
import { useEffect } from "react";
import { href, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/better-auth-client";

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
    if (
      !PublicKeyCredential.isConditionalMediationAvailable ||
      !PublicKeyCredential.isConditionalMediationAvailable()
    ) {
      return;
    }

    void authClient.signIn.passkey({ autoFill: true });
  }, []);

  return (
    <Button className="w-full" variant="secondary" onClick={signInPasskey}>
      <IconKeyFilled />
      <span>{textAction} with Passkey</span>
    </Button>
  );
}
