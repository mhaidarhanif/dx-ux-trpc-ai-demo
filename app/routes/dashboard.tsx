import { DebugCode } from "@/components/shared/debug-code";
import { UserProfilePanel } from "@/modules/auth/components/user-profile-panel";
import { redirectSignIn, requireSession } from "@/modules/auth/helpers";
import type { Route } from "./+types/dashboard";

export const meta: Route.MetaFunction = () => [{ title: "Dashboard" }];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { isAuthenticated, trpc } = await requireSession(request);
  if (!isAuthenticated) return redirectSignIn();
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
