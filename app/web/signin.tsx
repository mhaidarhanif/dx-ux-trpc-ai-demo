import { AuthPanel } from "@/modules/auth/components/auth-panel";
import {
  actionSignIn,
  requireSessionRedirectDashboard,
} from "@/modules/auth/helpers";
import type { Route } from "./+types/signin";

export const meta: Route.MetaFunction = () => [{ title: "Sign In" }];

export const loader = ({ request }: Route.LoaderArgs) =>
  requireSessionRedirectDashboard(request);

export default function SignInRoute({ actionData }: Route.ComponentProps) {
  return <AuthPanel authMode="signin" lastResult={actionData} />;
}

export const action = ({ request }: Route.ActionArgs) => actionSignIn(request);
