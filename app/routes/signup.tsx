import { AuthCard } from "@/components/shared/auth-card";
import { requireAuthFalse } from "@/lib/better-auth/helper";
import type { Route } from "./+types/signin";

export async function loader({ request }: Route.LoaderArgs) {
  return requireAuthFalse(request);
}

export default function SignUpRoute() {
  return (
    <>
      <AuthCard mode="signup" />
    </>
  );
}
