import { polarClient } from "@polar-sh/better-auth";
import {
  adminClient,
  magicLinkClient,
  multiSessionClient,
  oneTapClient,
  passkeyClient,
  phoneNumberClient,
  twoFactorClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_APP_URL,
  plugins: [
    adminClient(),
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
