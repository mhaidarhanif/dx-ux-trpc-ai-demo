import {
  actionSignIn,
  requireAuthRedirectDashboard,
} from "@/modules/auth/auth";
import { AuthPanel } from "@/modules/auth/components/auth-panel";
import type { Route } from "./+types/signin";

export function loader({ request }: Route.LoaderArgs) {
  return requireAuthRedirectDashboard(request);
}

export default function SignInRoute({ actionData }: Route.ComponentProps) {
  return <AuthPanel authMode="signin" lastResult={actionData} />;
}

export function action({ request }: Route.ActionArgs) {
  return actionSignIn(request);
}
