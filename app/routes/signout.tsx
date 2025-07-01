import { AuthPanelSignOut } from "@/modules/auth/components/auth-panel";
import {
  actionSignOut,
  requireAuthRedirectSignIn,
} from "@/modules/auth/helpers";
import type { Route } from "./+types/signout";

export const meta: Route.MetaFunction = () => [{ title: "Sign Out" }];

export function loader({ request }: Route.LoaderArgs) {
  return requireAuthRedirectSignIn(request);
}

export default function SignOutRoute({ loaderData }: Route.ComponentProps) {
  return <AuthPanelSignOut user={loaderData} />;
}

export function action({ request }: Route.ActionArgs) {
  return actionSignOut(request);
}
