import { CheckIcon, MinusIcon, XIcon } from "lucide-react";
import { redirect } from "react-router";

import { Debug } from "@/components/shared/debug";
import { AvatarAuto } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/generated/prisma/client";
import { formatDate } from "@/lib/datetime";
import { cn } from "@/lib/utils";
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

type UserField = {
  label: string;
  value: string | number | boolean | null;
  isCode?: boolean;
};

export default function UserDashboardRoute({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-gray-500">No user data found.</div>
      </div>
    );
  }

  function createUserFields(user: User): UserField[] {
    return [
      { label: "ID", value: user.id, isCode: true },
      { label: "Name", value: user.name },
      { label: "First Name", value: user.firstName },
      { label: "Last Name", value: user.lastName },
      { label: "Email", value: user.email },
      { label: "Email Verified", value: user.emailVerified },
      { label: "Phone Number", value: user.phoneNumber },
      { label: "Phone Verified", value: user.phoneNumberVerified },
      { label: "Role", value: user.role },
      { label: "2FA", value: user.twoFactorEnabled },
      { label: "Banned", value: user.banned },
      { label: "Ban Reason", value: user.banReason },
      { label: "Ban Expires", value: formatDate(user.banExpires) },
      { label: "Created At", value: formatDate(user.createdAt) },
      { label: "Updated At", value: formatDate(user.updatedAt) },
    ];
  }

  const userFields = createUserFields(user);

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
            {userFields.map((item) => {
              const valueIsBoolean = typeof item.value === "boolean";

              return (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <dt className="font-medium text-gray-700 dark:text-gray-300">{item.label}</dt>
                  <dd className={cn("text-gray-900 text-sm dark:text-gray-100", item.isCode && "font-mono")}>
                    {!valueIsBoolean && (item.value ?? <MinusIcon />)}
                    {valueIsBoolean && item.value && item.value === true ? (
                      <CheckIcon className="text-green-600 dark:text-green-400"></CheckIcon>
                    ) : (
                      item.value === false && <XIcon className="text-red-600 dark:text-red-400" />
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </CardContent>
      </Card>

      <Debug>{user}</Debug>
    </>
  );
}
