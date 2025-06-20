import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/better-auth-client";
import { requireAuthTrue } from "@/server/auth-helper";
import type { Route } from "./+types/signout";

export async function loader({ request }: Route.LoaderArgs) {
  return requireAuthTrue(request);
}

export default function SignOutRoute({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => navigate("/signin"),
      },
    });
  };

  return (
    <>
      <section className="space-y-4 p-8">
        <h1>Sign out account</h1>
        <p>
          @{loaderData.user?.username} ({loaderData.user?.email})
        </p>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </section>
    </>
  );
}
