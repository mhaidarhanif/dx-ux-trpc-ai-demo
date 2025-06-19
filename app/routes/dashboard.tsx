import { redirect } from "react-router";
import { Debug } from "@/components/shared/debug";
import { AvatarAuto } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/datetime";
import { requireAuth } from "@/server/auth-helper";
import { caller } from "@/server/trpc-caller";
import type { Route } from "./+types/dashboard";

export async function loader({ request }: Route.LoaderArgs) {
  const { isAuthenticated } = await requireAuth(request);
  if (!isAuthenticated) return redirect("/signin");

  const api = await caller(request);
  const user = await api.auth.getUser();
  return { user };
}

export default function UserDashboardRoute({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-gray-500">No user data found.</div>
      </div>
    );
  }

  const userFields = [
    { label: "ID", value: user.id },
    { label: "Name", value: user.name },
    { label: "First Name", value: user.firstName },
    { label: "Last Name", value: user.lastName },
    { label: "Phone", value: user.phone },
    { label: "Email", value: user.email },
    { label: "Email Verified", value: String(user.emailVerified) },
    { label: "Role", value: user.role },
    { label: "Banned", value: user.banned ? "Yes" : "No" },
    { label: "Ban Reason", value: user.banReason },
    { label: "Ban Expires", value: formatDate(user.banExpires) },
    { label: "Created At", value: formatDate(user.createdAt) },
    { label: "Updated At", value: formatDate(user.updatedAt) },
  ];

  return (
    <>
      <Card className="w-full max-w-md rounded-xl border border-border">
        <CardHeader className="flex flex-col items-center space-y-2">
          <AvatarAuto user={user} className="size-20" />
          <CardTitle className="text-center">
            <h3 className="font-bold text-2xl text-gray-900 dark:text-gray-100">{user.name || "No Name"}</h3>
            <p className="text-gray-500 text-sm dark:text-gray-400">{user.email}</p>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <dl className="divide-y divide-gray-200 dark:divide-gray-700">
            {userFields.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <dt className="font-medium text-gray-700 dark:text-gray-300">{item.label}</dt>
                <dd className="text-gray-900 text-sm dark:text-gray-100">{item.value ?? "-"}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      <Debug>{user}</Debug>
    </>
  );
}
