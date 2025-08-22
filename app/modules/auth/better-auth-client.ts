import {
  adminClient,
  inferAdditionalFields,
  magicLinkClient,
  multiSessionClient,
  passkeyClient,
  phoneNumberClient,
  twoFactorClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "@/modules/auth/better-auth";
import { envClient } from "@/modules/env/env";

export type AuthClientSession = typeof authClient.$Infer.Session;

export const authClient = createAuthClient({
  baseURL: envClient.VITE_APP_URL,
  plugins: [
    adminClient(),

    // https://better-auth.com/docs/concepts/typescript#inferring-additional-fields-on-client
    inferAdditionalFields<typeof auth>(),

    magicLinkClient(),
    multiSessionClient(),
    passkeyClient(),
    phoneNumberClient(),
    usernameClient(),

    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/2fa";
      },
    }),

    // polarClient(),
  ],
});

export const { signIn, signOut, signUp, useSession } = authClient;
