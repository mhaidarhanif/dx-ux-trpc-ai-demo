import { AvatarAuto } from "@/components/ui/avatar";
import { formatDate } from "@/lib/datetime";
import { requireAuthTrue } from "@/utils/auth/helper";
import type { Route } from "./+types/user";

export async function loader({ request }: Route.LoaderArgs) {
  return requireAuthTrue(request);
}

export default function UserDashboardRoute({
  loaderData,
}: Route.ComponentProps) {
  const { user } = loaderData;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
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
    <div className="flex justify-center my-8 mx-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center mb-6 space-y-2">
          <AvatarAuto user={user} className="size-20" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {user.name || "No Name"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {user.email}
          </p>
        </div>
        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
          {userFields.map((item) => (
            <div
              key={item.label}
              className="py-2 flex justify-between items-center"
            >
              <dt className="font-medium text-gray-700 dark:text-gray-300">
                {item.label}
              </dt>
              <dd className="text-sm text-gray-900 dark:text-gray-100">
                {item.value ?? "-"}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
