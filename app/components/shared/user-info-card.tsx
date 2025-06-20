import { CheckIcon, MinusIcon, XIcon } from "lucide-react";
import { Form, href, useNavigate } from "react-router";
import { ButtonLoading } from "@/components/shared/button-loading";
import { AvatarAuto } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/generated/prisma/client";
import { authClient } from "@/lib/better-auth-client";
import { formatDate } from "@/lib/datetime";
import { cn } from "@/lib/utils";

type UserField = {
  label: string;
  value: string | number | boolean | null;
  isCode?: boolean;
};

export function createUserFields(user: User): UserField[] {
  return [
    { label: "ID", value: user.id, isCode: true },
    { label: "Name", value: user.name },
    { label: "First Name", value: user.firstName },
    { label: "Last Name", value: user.lastName },
    { label: "Username", value: `@${user.username}` },
    { label: "Display Username", value: user.displayUsername },
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

export function UserInfoCard({ user }: { user: User }) {
  const navigate = useNavigate();

  const userFields = createUserFields(user);

  const addPasskey = async () => {
    await authClient.passkey.addPasskey({
      fetchOptions: {
        onSuccess: () => navigate("/dashboard"),
      },
    });
  };

  const revokeOtherSessions = async () => {
    await authClient.revokeOtherSessions();
  };

  return (
    <Card className="w-full max-w-md rounded-xl border border-border">
      <CardHeader className="flex flex-col items-center space-y-2">
        <AvatarAuto user={user} className="size-20" />
        <CardTitle className="text-center">
          <h3 className="font-bold text-2xl text-gray-900 dark:text-gray-100">
            {user.name || "No Name"}
          </h3>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {user.email}
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Button size="xs" variant="outline" onClick={addPasskey}>
            <span>Add Passkey</span>
          </Button>
          <Button size="xs" variant="outline" onClick={revokeOtherSessions}>
            <span>Revoke All Sessions</span>
          </Button>
          <Form method="post" action={href("/signout")}>
            <ButtonLoading
              size="xs"
              variant="outline"
              type="submit"
              submittingText="Signing Out..."
            >
              <span>Sign Out</span>
            </ButtonLoading>
          </Form>
        </div>

        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
          {userFields.map((item) => {
            const valueIsBoolean = typeof item.value === "boolean";

            return (
              <div
                key={item.label}
                className="flex items-center justify-between py-2"
              >
                <dt className="font-medium text-gray-700 dark:text-gray-300">
                  {item.label}
                </dt>
                <dd
                  className={cn(
                    "text-gray-900 text-sm dark:text-gray-100",
                    item.isCode && "font-mono"
                  )}
                >
                  {!valueIsBoolean && (item.value ?? <MinusIcon />)}
                  {valueIsBoolean && item.value && item.value === true ? (
                    <CheckIcon className="text-green-600 dark:text-green-400"></CheckIcon>
                  ) : (
                    item.value === false && (
                      <XIcon className="text-red-600 dark:text-red-400" />
                    )
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </CardContent>
    </Card>
  );
}
