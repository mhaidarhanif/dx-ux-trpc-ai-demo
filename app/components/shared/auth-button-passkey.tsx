import { KeyIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/better-auth-client";

export function AuthButtonPasskey({
  isSignIn,
  textAction,
}: {
  isSignIn: boolean;
  textAction: string;
}) {
  const navigate = useNavigate();

  const signInPasskey = async () => {
    await authClient.signIn.passkey();
    navigate(0);
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
    <>
      {isSignIn && (
        <Button className="w-full" variant="secondary" onClick={signInPasskey}>
          <KeyIcon />
          <span>{textAction} with Passkey</span>
        </Button>
      )}
    </>
  );
}
