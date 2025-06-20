import { KeyIcon } from "lucide-react";
import { Form, href, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { configSite } from "@/config/site";
import { useIsSubmitting } from "@/hooks/use-is-submitting";
import { authClient } from "@/lib/better-auth-client";

export function AuthButtonProviders({
  isSignIn,
  buttonSocialText,
}: {
  isSignIn: boolean;
  buttonSocialText: string;
}) {
  const navigate = useNavigate();
  const isSubmitting = useIsSubmitting();

  const signInPasskey = async () => {
    const response = await authClient.signIn.passkey();
    if (response) navigate(href("/dashboard"));
  };

  return (
    <fieldset className="flex flex-col gap-2" disabled={isSubmitting}>
      {configSite.authSocialProviders.map((authSocial) => (
        <Form method="post" action="/action/social" key={authSocial.provider}>
          <input type="hidden" name="provider" value={authSocial.provider} />
          <Button className="w-full" variant="secondary">
            {authSocial.icon}
            <span>
              {buttonSocialText} with {authSocial.label}
            </span>
          </Button>
        </Form>
      ))}
      {isSignIn && (
        <Button className="w-full" variant="secondary" onClick={signInPasskey}>
          <KeyIcon />
          <span>{buttonSocialText} with Passkey</span>
        </Button>
      )}
    </fieldset>
  );
}
