import { AuthPanelSignOut } from "@/modules/auth/components/auth-panel";
import {
  actionSignOut,
  requireUserRedirectSignIn,
} from "@/modules/auth/helpers";
import type { Route } from "./+types/signout";

export const meta: Route.MetaFunction = () => [{ title: "Sign Out" }];

export const loader = ({ request }: Route.LoaderArgs) =>
  requireUserRedirectSignIn(request);

export default function SignOutRoute({ loaderData }: Route.ComponentProps) {
  return <AuthPanelSignOut user={loaderData.user} />;
}

export const action = ({ request }: Route.ActionArgs) => actionSignOut(request);
