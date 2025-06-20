import { KeyIcon } from "lucide-react";
import { href, useNavigate } from "react-router";
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
    const response = await authClient.signIn.passkey();
    if (response) navigate(href("/dashboard"));
  };

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
