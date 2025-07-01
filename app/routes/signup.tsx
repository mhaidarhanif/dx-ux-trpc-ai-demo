import { AuthCard } from "@/components/shared/auth-card";
import { actionSignUp, requireAuthRedirectDashboard } from "@/lib/auth-helper";
import type { Route } from "./+types/signin";

export function loader({ request }: Route.LoaderArgs) {
  return requireAuthRedirectDashboard(request);
}

export default function SignUpRoute({ actionData }: Route.ComponentProps) {
  return <AuthCard authMode="signup" lastResult={actionData} />;
}

export function action({ request }: Route.ActionArgs) {
  return actionSignUp(request);
}
