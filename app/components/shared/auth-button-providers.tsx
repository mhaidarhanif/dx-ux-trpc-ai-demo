import { Form } from "react-router";
import { Button } from "@/components/ui/button";
import { configSite } from "@/config/site";

export function AuthButtonProviders({ textAction }: { textAction: string }) {
  return (
    <>
      {configSite.authSocialProviders.map((authSocial) => (
        <Form method="post" action="/action/social" key={authSocial.provider}>
          <input type="hidden" name="provider" value={authSocial.provider} />
          <Button className="w-full" variant="secondary">
            {authSocial.icon}
            <span>
              {textAction} with {authSocial.label}
            </span>
          </Button>
        </Form>
      ))}
    </>
  );
}
