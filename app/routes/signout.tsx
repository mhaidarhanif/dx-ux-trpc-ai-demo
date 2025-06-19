import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/better-auth/client";
import { requireAuthTrue } from "@/lib/better-auth/helper";
import type { Route } from "./+types/signout";

export async function loader({ request }: Route.LoaderArgs) {
  return requireAuthTrue(request);
}

export default function SignOutRoute() {
  const navigate = useNavigate();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/signin");
        },
      },
    });
  };

  return (
    <>
      <section className="p-10">
        <Button onClick={() => signOut()}>Sign Out</Button>
      </section>
    </>
  );
}
