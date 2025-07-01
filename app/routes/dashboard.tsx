import { DebugCode } from "@/components/shared/debug-code";
import { UserProfilePanel } from "@/modules/auth/components/user-profile-panel";
import { requireAuthSession } from "@/modules/auth/helpers";
import type { Route } from "./+types/dashboard";

export const meta: Route.MetaFunction = () => [{ title: "Dashboard" }];

export async function loader({ request }: Route.LoaderArgs) {
  const { trpc } = await requireAuthSession(request);
  return trpc.auth.getUserComplete();
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <UserProfilePanel user={loaderData} />
      <DebugCode>{loaderData}</DebugCode>
    </>
  );
}
