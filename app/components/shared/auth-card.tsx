import { type SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { Form, href, Link } from "react-router";
import { ButtonLoading } from "@/components/shared/button-loading";
import { Logo } from "@/components/shared/logo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsSubmitting } from "@/hooks/use-is-submitting";
import { cn } from "@/lib/utils";
import { AuthSignInSchema, AuthSignUpSchema } from "@/modules/auth/schema";
import { AuthButtonPasskey } from "./auth-button-passkey";
import { AuthButtonProviders } from "./auth-button-providers";

export function AuthCard({
  cardMode = "signin",
  lastResult,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  cardMode: "signup" | "signin" | "signout" | "forgot-password";
  lastResult: SubmissionResult | null | undefined;
}) {
  const isSubmitting = useIsSubmitting();

  const [formSignUp, fieldsSignUp] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AuthSignUpSchema });
    },
  });

  const [formSignIn, fieldsSignIn] = useForm({
    lastResult,
    shouldValidate: "onBlur",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AuthSignInSchema });
    },
  });

  const mode = {
    isSignUp: cardMode === "signup",
    isSignIn: cardMode === "signin",
  };

  const text = {
    action: mode.isSignUp ? "Sign Up" : "Sign In",
    idle: mode.isSignUp ? "Create New Account" : "Continue with Email",
    submitting: mode.isSignUp ? "Creating New Account..." : "Signing In...",
    formActionPath: mode.isSignUp ? href("/signup") : href("/signin"),
    form: mode.isSignUp ? formSignUp : formSignIn,
    fields: mode.isSignUp ? fieldsSignUp : fieldsSignIn,
  };

  return (
    <section
      className={cn(
        "flex w-full max-w-xs flex-col items-center gap-6",
        className
      )}
      {...props}
    >
      <div className="text-center">
        <Logo classNameText="font-black font-brand" />
        {mode.isSignUp && <p>Create your new account.</p>}
        {mode.isSignIn && <p>Continue with your account.</p>}
      </div>

      <div className="flex w-full flex-col gap-6">
        <fieldset className="flex flex-col gap-2" disabled={isSubmitting}>
          <AuthButtonProviders textAction={text.action} />
          <AuthButtonPasskey
            isSignIn={mode.isSignIn}
            textAction={text.action}
          />
        </fieldset>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            or
          </span>
        </div>

        <Form
          className="grid gap-4"
          method="post"
          action={text.formActionPath}
          id={text.form.id}
          onSubmit={text.form.onSubmit}
        >
          <fieldset disabled={isSubmitting} className="grid gap-4">
            {mode.isSignUp && (
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="First Last"
                  required
                  name={fieldsSignUp.name.name}
                />
              </div>
            )}

            {mode.isSignUp && (
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="yourhandle"
                  required
                  name={fieldsSignUp.username.name}
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                required
                name={text.fields.email.name}
                autoComplete="current-password webauthn"
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {mode.isSignIn && (
                  <Link
                    to={href("/forgot-password")}
                    className="text-xs leading-none"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <Input
                id="password"
                type="password"
                required
                name={text.fields.password.name}
                autoComplete="current-password webauthn"
              />
            </div>

            <ButtonLoading
              type="submit"
              className="w-full"
              submittingText={text.submitting}
            >
              {text.idle}
            </ButtonLoading>

            {text.form.errors && (
              <Alert variant="destructive">
                <AlertDescription className="text-xs">
                  {text.form.errors}
                </AlertDescription>
              </Alert>
            )}
          </fieldset>
        </Form>

        {mode.isSignIn && (
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to={href("/signup")} className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        )}
      </div>

      {mode.isSignUp && (
        <p className="max-w-xs text-pretty text-center text-muted-foreground text-xs *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
          By clicking continue, you agree to our{" "}
          <Link to={href("/about")}>Terms of Service</Link>,{" "}
          <Link to={href("/about")}>Privacy Policy</Link>, and{" "}
          <Link to={href("/about")}>Cookies Policy</Link>.
        </p>
      )}
    </section>
  );
}
