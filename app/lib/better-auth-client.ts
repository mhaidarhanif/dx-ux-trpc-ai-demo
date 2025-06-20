import {
  adminClient,
  multiSessionClient,
  phoneNumberClient,
  twoFactorClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [
    usernameClient(),
    adminClient(),
    multiSessionClient(),
    phoneNumberClient(),
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/2fa";
      },
    }),
  ],
});
