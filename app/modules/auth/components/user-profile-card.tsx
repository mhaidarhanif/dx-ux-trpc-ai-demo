import { Form, href, useFetcher, useNavigate } from "react-router";
import { ButtonLoading } from "@/components/buttons/button-loading";
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
import { formatDate } from "@/lib/text/datetime";
import { cn } from "@/lib/utils";
import { authClient } from "@/modules/auth/better-auth-client";
import { UserAvatar } from "@/modules/auth/components/user-avatar";
import type { AppRouterOutputs } from "@/modules/trpc/trpc-client";

export function UserProfileCard({
  user,
}: {
  user: AppRouterOutputs["auth"]["getUserComplete"];
}) {
  const navigate = useNavigate();
  const fetcherSesssion = useFetcher();

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

  if (!user) return null;

  return (
    <div className="w-full max-w-md space-y-4">
      <Card id="user">
        <CardHeader className="flex flex-col items-center space-y-2">
          <UserAvatar size="xl" user={user} />
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
            <fetcherSesssion.Form
              action={href("/api/auth/*", { "*": "revoke-other-sessions" })}
              method="post"
            >
              <ButtonLoading
                fetcher={fetcherSesssion}
                size="xs"
                submittingText="Revoking Sessions..."
                type="submit"
                variant="outline"
              >
                Revoke Other Sessions
              </ButtonLoading>
            </fetcherSesssion.Form>
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

export type FieldItem = {
  label: string;
  value: string | number | boolean | null;
  isCode?: boolean;
  isLong?: boolean;
};

export function FieldGroups({
  emptyMessage,
  fieldGroups,
}: {
  emptyMessage: string;
  fieldGroups: FieldItem[][];
}) {
  if (fieldGroups.length === 0)
    return <p className="text-muted-foreground text-sm">{emptyMessage}</p>;

  return (
    <div className="space-y-2">
      {fieldGroups.map((group, index) => (
        <dl className="space-y-1 rounded-lg bg-secondary/20 p-2" key={index}>
          {group.map((item) => (
            <Flex className="justify-between" key={item.label}>
              <dt className="text-muted-foreground text-sm">{item.label}</dt>
              <dd
                className={cn(
                  "break-all text-xs",
                  item.isCode && "font-mono",
                  item.isLong && "text-3xs"
                )}
              >
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
): FieldItem[] {
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
    { label: "App Language", value: user.appLanguage },
    { label: "App Theme", value: user.appTheme },
    { label: "Accounts Count", value: user.accounts.length },
    { label: "Passkeys Count", value: user.passkeys.length },
    { label: "Sessions Count", value: user.sessions.length },
    { label: "Created At", value: formatDate(user.createdAt) },
    { label: "Updated At", value: formatDate(user.updatedAt) },
  ];
}

export function createAccountFieldGroups(
  accounts: AppRouterOutputs["auth"]["getUserComplete"]["accounts"]
): FieldItem[][] {
  if (!accounts || accounts.length === 0) return [];

  return accounts.map((account) => [
    { label: "Provider ID", value: account.providerId },
    { label: "Account ID", value: account.accountId, isCode: true },
    { label: "Linked At", value: formatDate(account.createdAt) },
    { label: "Scope", value: account.scope, isCode: true, isLong: true },
  ]);
}

export function createPasskeyFieldGroups(
  passkeys: AppRouterOutputs["auth"]["getUserComplete"]["passkeys"]
): FieldItem[][] {
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
): FieldItem[][] {
  if (!sessions || sessions.length === 0) return [];

  return sessions.map((session) => [
    { label: "Started At", value: formatDate(session.createdAt) },
    { label: "Expires At", value: formatDate(session.expiresAt) },
    { label: "IP Address", value: session.ipAddress, isCode: true },
    {
      label: "User Agent",
      value: session.userAgent,
      isCode: true,
      isLong: true,
    },
  ]);
}
