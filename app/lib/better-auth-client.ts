import {
  adminClient,
  magicLinkClient,
  multiSessionClient,
  passkeyClient,
  phoneNumberClient,
  twoFactorClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.VITE_APP_URL,
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
  ],
});

export const { signIn, signOut, signUp, useSession } = authClient;
