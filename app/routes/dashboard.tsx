import { DebugCode } from "@/components/shared/debug-code";
import { UserProfilePanel } from "@/modules/auth/components/user-profile-panel";
import { requireAuthRedirectSignIn } from "@/modules/auth/helpers";
import type { Route } from "./+types/dashboard";

export const meta: Route.MetaFunction = () => [{ title: "Dashboard" }];

export async function loader({ request }: Route.LoaderArgs) {
  return await requireAuthRedirectSignIn(request);
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <>
      <UserProfilePanel user={user} />
      <DebugCode>{user}</DebugCode>
    </>
  );
}
