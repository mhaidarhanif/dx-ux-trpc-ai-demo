import { polarClient } from "@polar-sh/better-auth";
import {
  adminClient,
  inferAdditionalFields,
  magicLinkClient,
  multiSessionClient,
  oneTapClient,
  passkeyClient,
  phoneNumberClient,
  twoFactorClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "@/server/better-auth";

export type AuthClientSession = typeof authClient.$Infer.Session;

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_APP_URL,
  plugins: [
    adminClient(),
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
    oneTapClient({
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      autoSelect: true,
      cancelOnTapOutside: false,
      context: "signin",
      additionalOptions: {},
      promptOptions: { baseDelay: 2000, maxAttempts: 10 },
    }),
    polarClient(),
  ],
});

export const { signIn, signOut, signUp, useSession } = authClient;
