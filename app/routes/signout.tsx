import { AuthPanelSignOut } from "@/modules/auth/components/auth-panel";
import {
  actionSignOut,
  redirectSignIn,
  requireSession,
} from "@/modules/auth/helpers";
import type { Route } from "./+types/signout";

export const meta: Route.MetaFunction = () => [{ title: "Sign Out" }];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { isAuthenticated, trpc } = await requireSession(request);
  if (!isAuthenticated) return redirectSignIn();
  return trpc.auth.getUserMinimal();
};

export default function SignOutRoute({ loaderData }: Route.ComponentProps) {
  return <AuthPanelSignOut user={loaderData} />;
}

export const action = ({ request }: Route.ActionArgs) => actionSignOut(request);
