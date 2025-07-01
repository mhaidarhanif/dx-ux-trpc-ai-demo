import { DebugCode } from "@/components/shared/debug-code";
import { UserProfilePanel } from "@/modules/auth/components/user-profile-panel";
import { requireSession } from "@/modules/auth/helpers";
import type { Route } from "./+types/dashboard";

export const meta: Route.MetaFunction = () => [{ title: "Dashboard" }];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { trpc } = await requireSession(request);
  return trpc.auth.getUserComplete();
};

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  return (
    <section>
      <UserProfilePanel user={loaderData} />
      <DebugCode>{loaderData}</DebugCode>
    </section>
  );
}
