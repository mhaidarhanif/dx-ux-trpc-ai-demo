import { DebugCode } from "@/components/shared/debug-code";
import { UserProfileCard } from "@/modules/auth/components/user-profile-card";
import { requireAuthRedirectSignIn } from "@/modules/auth/helpers";
import type { Route } from "./+types/dashboard";

export async function loader({ request }: Route.LoaderArgs) {
  return await requireAuthRedirectSignIn(request);
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <>
      <UserProfileCard user={user} />
      <DebugCode>{user}</DebugCode>
    </>
  );
}
