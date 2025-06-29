import { Form, href, useNavigate } from "react-router";
import { AvatarAuto } from "@/components/shared/avatar-auto";
import { ButtonLoading } from "@/components/shared/button-loading";
import { Flex } from "@/components/shared/flex";
import { IconBooleanValue } from "@/components/shared/icon-boolean-value";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/better-auth-client";
import { formatDate } from "@/lib/datetime";
import type { AppRouterOutputs } from "@/lib/trpc-client";
import { cn } from "@/lib/utils";

export type FieldType = {
  label: string;
  value: string | number | boolean | null;
  isCode?: boolean;
};

export function UserProfileCard({
  user,
}: {
  user: AppRouterOutputs["auth"]["getUserComplete"];
}) {
  const navigate = useNavigate();

  const userFields = createUserFields(user);
  const accountFieldGroups = createAccountFieldGroups(user.accounts);
  const passkeyFieldGroups = createPasskeyFieldGroups(user.passkeys);
  const sessionFieldGroups = createSessionFieldGroups(user.sessions);

  const addPasskey = async () => {
    await authClient.passkey.addPasskey({
      fetchOptions: {
        onSuccess: () => navigate(href("/dashboard")),
      },
    });
  };

  const revokeOtherSessions = async () => {
    await authClient.revokeOtherSessions();
  };

  if (!user) return null;

  return (
    <div className="w-full max-w-md space-y-4">
      <Card id="user">
        <CardHeader className="flex flex-col items-center space-y-2">
          <AvatarAuto size="xl" user={user} />
          <CardTitle className="text-center">
            <h3 className="font-bold text-2xl text-gray-900 dark:text-gray-100">
              {user.name || "No Name"}
            </h3>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              {user.email}
            </p>
          </CardTitle>
          <CardDescription className="flex items-center justify-center gap-2">
            <Form action={href("/signout")} method="post">
              <ButtonLoading
                size="xs"
                submittingText="Signing Out..."
                type="submit"
                variant="outline"
              >
                Sign Out
              </ButtonLoading>
            </Form>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <dl className="divide-y divide-border" id="user-fields">
            {userFields.map((item) => {
              return (
                <div
                  className="flex items-center justify-between py-2"
                  key={item.label}
                >
                  <dt className="text-muted-foreground text-sm">
                    {item.label}
                  </dt>
                  <dd className={cn("text-sm", item.isCode && "font-mono")}>
                    <IconBooleanValue>{item.value}</IconBooleanValue>
                  </dd>
                </div>
              );
            })}
          </dl>
        </CardContent>
      </Card>

      <Card id="accounts">
        <CardHeader>
          <CardTitle>Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroups
            emptyMessage="No linked accounts."
            fieldGroups={accountFieldGroups}
          />
        </CardContent>
      </Card>

      <Card id="passkeys">
        <CardHeader>
          <CardTitle>Passkeys</CardTitle>
          <CardDescription>
            <Button onClick={addPasskey} size="xs" variant="outline">
              Add Passkey
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroups
            emptyMessage="No passkeys registered."
            fieldGroups={passkeyFieldGroups}
          />
        </CardContent>
      </Card>

      <Card id="sessions">
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
          <CardDescription>
            <Button onClick={revokeOtherSessions} size="xs" variant="outline">
              Revoke All Sessions
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroups
            emptyMessage="No active sessions."
            fieldGroups={sessionFieldGroups}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export function FieldGroups({
  emptyMessage,
  fieldGroups,
}: {
  emptyMessage: string;
  fieldGroups: FieldType[][];
}) {
  if (fieldGroups.length === 0) return <div>{emptyMessage}</div>;

  return (
    <div className="space-y-2">
      {fieldGroups.map((group, index) => (
        <dl className="space-y-1 rounded-lg bg-secondary/20 p-2" key={index}>
          {group.map((item) => (
            <Flex className="justify-between" key={item.label}>
              <dt className="text-muted-foreground text-sm">{item.label}</dt>
              <dd className={cn("text-xs", item.isCode && "font-mono")}>
                <IconBooleanValue>{item.value}</IconBooleanValue>
              </dd>
            </Flex>
          ))}
        </dl>
      ))}
    </div>
  );
}

export function createUserFields(
  user: AppRouterOutputs["auth"]["getUserComplete"]
): FieldType[] {
  if (!user) return [];

  return [
    { label: "ID", value: user.id, isCode: true },
    { label: "Name", value: user.name },
    { label: "First Name", value: user.firstName },
    { label: "Last Name", value: user.lastName },
    { label: "Username", value: `@${user.username}` },
    { label: "Display Username", value: `@${user.displayUsername}` },
    { label: "Email", value: user.email },
    { label: "Email Verified", value: user.emailVerified },
    { label: "Phone Number", value: user.phoneNumber },
    { label: "Phone Verified", value: user.phoneNumberVerified },
    { label: "Role", value: user.role },
    { label: "2FA", value: user.twoFactorEnabled },
    { label: "Banned", value: user.banned },
    { label: "Ban Reason", value: user.banReason },
    { label: "Ban Expires", value: formatDate(user.banExpires) },
    { label: "Language", value: user.lang },
    { label: "Theme", value: user.theme },
    // { label: "Passkey Enabled", value: true },
    { label: "Created At", value: formatDate(user.createdAt) },
    { label: "Updated At", value: formatDate(user.updatedAt) },
  ];
}

export function createAccountFieldGroups(
  accounts: AppRouterOutputs["auth"]["getUserComplete"]["accounts"]
): FieldType[][] {
  if (!accounts || accounts.length === 0) return [];

  return accounts.map((account) => [
    { label: "Provider ID", value: account.providerId },
    { label: "Account ID", value: account.accountId, isCode: true },
    { label: "Scope", value: account.scope, isCode: true },
    { label: "Linked At", value: formatDate(account.createdAt) },
  ]);
}

export function createPasskeyFieldGroups(
  passkeys: AppRouterOutputs["auth"]["getUserComplete"]["passkeys"]
): FieldType[][] {
  if (!passkeys || passkeys.length === 0) return [];

  return passkeys.map((passkey) => [
    { label: "Credential ID", value: passkey.credentialID, isCode: true },
    { label: "Device Type", value: passkey.deviceType },
    { label: "Backed Up", value: passkey.backedUp },
    { label: "Created At", value: formatDate(passkey.createdAt) },
  ]);
}

export function createSessionFieldGroups(
  sessions: AppRouterOutputs["auth"]["getUserComplete"]["sessions"]
): FieldType[][] {
  if (!sessions || sessions.length === 0) return [];

  return sessions.map((session) => [
    { label: "IP Address", value: session.ipAddress, isCode: true },
    { label: "User Agent", value: session.userAgent },
    { label: "Started At", value: formatDate(session.createdAt) },
    { label: "Expires At", value: formatDate(session.expiresAt) },
  ]);
}
