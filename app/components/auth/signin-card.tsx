import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { Form, href, Link } from "react-router";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/client";
import { cn } from "@/lib/utils";

export function SignInCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const signInGitHub = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/user",
    });
  };

  const signInGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/user",
    });
  };

  return (
    <section className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex self-center">
        <Logo classNameText="font-black font-brand" />
      </div>

      <Card>
        <CardContent className="grid w-full max-w-md gap-6">
          <div className="flex flex-col gap-4">
            <Button variant="outline" onClick={() => signInGitHub()}>
              <SiGithub />
              <span>Sign in with GitHub</span>
            </Button>
            <Button variant="outline" onClick={() => signInGoogle()}>
              <SiGoogle />
              <span>Sign in with Google</span>
            </Button>
          </div>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
            <span className="relative z-10 bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <Form className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto text-xs underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </Form>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to={href("/signup")} className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-xs text-pretty text-center text-muted-foreground text-xs *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
        By clicking continue, you agree to our{" "}
        <Link to={href("/about")}>Terms of Service</Link> and{" "}
        <Link to={href("/about")}>Privacy Policy</Link>.
      </div>
    </section>
  );
}
