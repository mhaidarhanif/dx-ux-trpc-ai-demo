import { DebugCode } from "@/components/shared/debug-code";
import { requireAuthRedirectSignIn } from "@/modules/auth/auth";
import { UserProfileCard } from "@/modules/user/components/user-profile-card";
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
