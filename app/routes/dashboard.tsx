import { href, redirect } from "react-router";

import { Debug } from "@/components/shared/debug";
import { UserInfoCard } from "@/components/shared/user-info-card";
import { requireAuthUserData } from "@/server/auth-helper";
import type { Route } from "./+types/dashboard";

export async function loader({ request }: Route.LoaderArgs) {
  const { isAuthenticated, user } = await requireAuthUserData(request);
  if (!isAuthenticated) return redirect(href("/signin"));
  return { user };
}

export default function UserDashboardRoute({
  loaderData,
}: Route.ComponentProps) {
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
      <UserInfoCard user={user} />
      <Debug className="max-w-xs">{user}</Debug>
    </>
  );
}
