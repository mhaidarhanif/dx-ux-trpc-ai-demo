import { AuthCard } from "@/components/shared/auth-card";
import { actionSignIn, requireAuthRedirectDashboard } from "@/lib/auth-helper";
import type { Route } from "./+types/signin";

export function loader({ request }: Route.LoaderArgs) {
  return requireAuthRedirectDashboard(request);
}

export default function SignInRoute({ actionData }: Route.ComponentProps) {
  return <AuthCard authMode="signin" lastResult={actionData} />;
}

export async function action({ request }: Route.ActionArgs) {
  return await actionSignIn(request);
}
