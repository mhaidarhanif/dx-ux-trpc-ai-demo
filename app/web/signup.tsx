import { AuthPanel } from "@/modules/auth/components/auth-panel";
import {
  actionSignUp,
  requireSessionRedirectDashboard,
} from "@/modules/auth/helpers";
import type { Route } from "./+types/signin";

export const meta: Route.MetaFunction = () => [{ title: "Sign Up" }];

export const loader = ({ request }: Route.LoaderArgs) =>
  requireSessionRedirectDashboard(request);

export default function SignUpRoute({ actionData }: Route.ComponentProps) {
  return <AuthPanel authMode="signup" lastResult={actionData} />;
}

export const action = ({ request }: Route.ActionArgs) => actionSignUp(request);
