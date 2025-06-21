import { type SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { useEffect } from "react";
import { Form, href, Link } from "react-router";
import { toast } from "sonner";

import { AuthButtonPasskey } from "@/components/shared/auth-button-passkey";
import { AuthButtonProviders } from "@/components/shared/auth-button-providers";
import { ButtonLoading } from "@/components/shared/button-loading";
import { FieldErrors } from "@/components/shared/field-errors";
import { InputPassword } from "@/components/shared/input-password";
import { Logo } from "@/components/shared/logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsSubmitting } from "@/hooks/use-is-submitting";
import { cn } from "@/lib/utils";
import { AuthSignInSchema, AuthSignUpSchema } from "@/schemas/auth";

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
    submitting: mode.isSignUp
      ? "Creating New Account..."
      : "Continuing with Email...",
    formActionPath: mode.isSignUp ? href("/signup") : href("/signin"),
    form: mode.isSignUp ? formSignUp : formSignIn,
    fields: mode.isSignUp ? fieldsSignUp : fieldsSignIn,
  };

  useEffect(() => {
    if (text.form.errors) {
      toast.error("Auth error", { description: text.form.errors });
    }
  }, [text.form.errors]);

  return (
    <section
      className={cn(
        "flex w-full max-w-xs flex-col items-center gap-6",
        className
      )}
      {...props}
    >
      <div className="text-center">
        <Logo size="xl" classNameText="hidden" />
        {mode.isSignUp && <p>Let's create your new account.</p>}
        {mode.isSignIn && <p>Continue with your account.</p>}
      </div>

      <fieldset className="flex w-full flex-col gap-2" disabled={isSubmitting}>
        <AuthButtonProviders textAction={text.action} />
        <AuthButtonPasskey isSignIn={mode.isSignIn} textAction={text.action} />

        <div className="relative my-2 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
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
          {mode.isSignUp && (
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                required
                id="name"
                type="text"
                placeholder="First Last"
                name={fieldsSignUp.name.name}
                autoComplete="name"
                autoFocus={Boolean(fieldsSignUp.name.errors)}
              />
              <FieldErrors>{fieldsSignUp.name}</FieldErrors>
            </div>
          )}

          {mode.isSignUp && (
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                required
                id="username"
                type="text"
                placeholder="yourhandle"
                name={fieldsSignUp.username.name}
                autoComplete="username"
                autoFocus={Boolean(fieldsSignUp.username.errors)}
              />
              <FieldErrors>{fieldsSignUp.username}</FieldErrors>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              required
              id="email"
              type="email"
              placeholder="email@example.com"
              name={text.fields.email.name}
              autoComplete="email webauthn"
              autoFocus={Boolean(fieldsSignUp.email.errors)}
            />
            <FieldErrors>{fieldsSignIn.email}</FieldErrors>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {mode.isSignIn && (
                <Link
                  to={href("/forgot-password")}
                  className="text-secondary text-xs leading-none"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <InputPassword
              required
              id="password"
              name={text.fields.password.name}
              autoComplete="current-password webauthn"
              autoFocus={Boolean(fieldsSignUp.password.errors)}
            />
            <FieldErrors>{fieldsSignIn.password}</FieldErrors>
          </div>

          <ButtonLoading
            type="submit"
            className="w-full"
            submittingText={text.submitting}
          >
            {text.idle}
          </ButtonLoading>
        </Form>

        {mode.isSignIn && (
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to={href("/signup")} className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        )}
      </fieldset>

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
