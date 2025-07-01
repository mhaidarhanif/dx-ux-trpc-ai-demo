import { AuthPanel } from "@/modules/auth/components/auth-panel";
import {
  actionSignUp,
  requireAuthRedirectDashboard,
} from "@/modules/auth/helpers";
import type { Route } from "./+types/signin";

export const meta: Route.MetaFunction = () => [{ title: "Sign Up" }];

export function loader({ request }: Route.LoaderArgs) {
  return requireAuthRedirectDashboard(request);
}

export default function SignUpRoute({ actionData }: Route.ComponentProps) {
  return <AuthPanel authMode="signup" lastResult={actionData} />;
}

export function action({ request }: Route.ActionArgs) {
  return actionSignUp(request);
}
