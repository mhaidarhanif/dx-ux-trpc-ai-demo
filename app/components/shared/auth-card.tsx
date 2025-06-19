import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { Form, href, Link } from "react-router";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/better-auth-client";
import { cn } from "@/lib/utils";

export function AuthCard({
  mode = "signin",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  mode: "signup" | "signin" | "signout" | "forgot-password";
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

  const isSignUp = mode === "signup";
  const isSignIn = mode === "signin";
  const buttonText = isSignIn ? "Sign In" : "Sign Up";
  const buttonCTA = isSignIn ? "Continue with Email" : "Create New Account";

  return (
    <section className={cn("flex w-full max-w-xs flex-col items-center gap-6", className)} {...props}>
      <div className="text-center">
        <Logo classNameText="font-black font-brand" />
        {isSignUp && <p>Create your new account.</p>}
        {isSignIn && <p>Continue with your account.</p>}
      </div>

      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Button variant="secondary" onClick={signInGitHub}>
            <SiGithub />
            <span>{buttonText} with GitHub</span>
          </Button>
          <Button variant="secondary" onClick={signInGoogle}>
            <SiGoogle />
            <span>{buttonText} with Google</span>
          </Button>
        </div>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">or</span>
        </div>

        <Form className="grid gap-4">
          {isSignUp && (
            <div className="grid gap-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input id="fullname" type="text" placeholder="First Last" required />
            </div>
          )}

          {isSignUp && (
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" placeholder="yourhandle" required />
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@example.com" required />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>

              {isSignIn && (
                <Link to={href("/forgot-password")} className="text-xs leading-none">
                  Forgot password?
                </Link>
              )}
            </div>
            <Input id="password" type="password" required />
          </div>

          <Button type="submit" className="w-full">
            {buttonCTA}
          </Button>
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
          By clicking continue, you agree to our <Link to={href("/about")}>Terms of Service</Link>,{" "}
          <Link to={href("/about")}>Privacy Policy</Link>, and <Link to={href("/about")}>Cookies Policy</Link>.
        </p>
      )}
    </section>
  );
}
