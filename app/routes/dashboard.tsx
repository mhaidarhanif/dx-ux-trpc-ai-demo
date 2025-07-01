import { DebugCode } from "@/components/shared/debug-code";
import { UserProfileCard } from "@/components/shared/user-profile-card";
import { requireAuthRedirectSignIn } from "@/lib/auth-helper";
import type { Route } from "./+types/dashboard";

export async function loader({ request }: Route.LoaderArgs) {
  return await requireAuthRedirectSignIn(request);
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-gray-500">No user data found.</div>
      </div>
    );
  }

  return (
    <>
      <UserProfileCard user={user} />
      <DebugCode>{user}</DebugCode>
    </>
  );
}
