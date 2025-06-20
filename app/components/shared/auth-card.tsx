import { type SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { Form, href, Link } from "react-router";
import { ButtonLoading } from "@/components/shared/button-loading";
import { Logo } from "@/components/shared/logo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/better-auth-client";
import { cn } from "@/lib/utils";
import { AuthSignInSchema, AuthSignUpSchema } from "@/modules/auth/schema";

export function AuthCard({
  mode = "signin",
  lastResult,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  mode: "signup" | "signin" | "signout" | "forgot-password";
  lastResult: SubmissionResult | null | undefined;
}) {
  const signInGitHub = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  };

  const signInGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

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

  const isSignUp = mode === "signup";
  const isSignIn = mode === "signin";
  const buttonText = isSignIn ? "Sign In" : "Sign Up";
  const buttonSubmittingText = isSignIn ? "Signing In..." : "Signing Up...";
  const buttonPrimaryText = isSignIn
    ? "Continue with Email"
    : "Create New Account";

  const formActionPath = isSignUp ? href("/signup") : href("/signin");
  const form = isSignUp ? formSignUp : formSignIn;
  const fields = isSignUp ? fieldsSignUp : fieldsSignIn;

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
        {isSignUp && <p>Create your new account.</p>}
        {isSignIn && <p>Continue with your account.</p>}
      </div>

      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-4">
          <ButtonLoading
            variant="secondary"
            onClick={signInGitHub}
            submittingText={`${buttonSubmittingText} with GitHub`}
          >
            <SiGithub />
            <span>{buttonText} with GitHub</span>
          </ButtonLoading>
          <ButtonLoading
            variant="secondary"
            onClick={signInGoogle}
            submittingText={`${buttonSubmittingText} with Google`}
          >
            <SiGoogle />
            <span>{buttonText} with Google</span>
          </ButtonLoading>
        </div>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            or
          </span>
        </div>

        <Form
          className="grid gap-4"
          method="post"
          action={formActionPath}
          id={form.id}
          onSubmit={form.onSubmit}
        >
          {isSignUp && (
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

          {isSignUp && (
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
              name={fields.email.name}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>

              {isSignIn && (
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
              name={fields.password.name}
            />
          </div>

          <ButtonLoading
            type="submit"
            className="w-full"
            submittingText={buttonSubmittingText}
          >
            {buttonPrimaryText}
          </ButtonLoading>

          {form.errors && (
            <Alert variant="destructive">
              <AlertDescription className="text-xs">
                {form.errors}
              </AlertDescription>
            </Alert>
          )}
        </Form>

        {isSignIn && (
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to={href("/signup")} className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        )}
      </div>

      {isSignUp && (
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
