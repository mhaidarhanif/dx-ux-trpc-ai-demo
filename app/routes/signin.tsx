import { AuthCard } from "@/components/shared/auth-card";
import { requireAuthFalse } from "@/server/auth";
import type { Route } from "./+types/signin";

export async function loader({ request }: Route.LoaderArgs) {
  return requireAuthFalse(request);
}

export default function SignInRoute() {
  return (
    <>
      <AuthCard mode="signin" />
    </>
  );
}
