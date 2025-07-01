import { betterAuth, type User } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { inferAdditionalFields } from "better-auth/client/plugins";
import {
  admin,
  anonymous,
  emailOTP,
  haveIBeenPwned,
  magicLink,
  multiSession,
  oneTap,
  openAPI,
  phoneNumber,
  twoFactor,
  username,
} from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { configSchema } from "@/lib/config/schema";
import { configSite } from "@/lib/config/site";
import { prisma } from "@/lib/database/prisma";
import { devlog } from "@/lib/system/logger";
import {
  createUsername,
  createUsernameGitHub,
  getNameParts,
} from "@/lib/text/convert";
import { envServer } from "@/modules/env/env.server";

export type DefaultAuthSession = typeof auth.$Infer.Session;

export const auth = betterAuth({
  appName: configSite.name,
  baseURL: envServer.APP_URL,
  basePath: "/api/auth",

  database: prismaAdapter(prisma, { provider: "postgresql" }),

  // https://better-auth.com/docs/concepts/database#secondary-storage
  // secondaryStorage

  advanced: { database: { generateId: false } },

  user: {
    modelName: "User",
    additionalFields: {
      firstName: { type: "string", required: false },
      lastName: { type: "string", required: false },
      appLanguage: { type: "string", required: false, defaultValue: "en" },
      appTheme: { type: "string", required: false, defaultValue: "" },
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url, token }) => {
        await devlog.info("SEND_CHANGE_EMAIL_VERIFICATION", {
          user,
          newEmail,
          url,
          token,
        });
      },
      deleteUser: {
        enabled: true,
        sendDeleteAccountVerification: async ({
          user,
          url,
          token,
        }: {
          user: User;
          url: string;
          token: string;
        }) => {
          await devlog.info("SEND_DELETE_ACCOUNT_VERIFICATION", {
            user,
            url,
            token,
          });
        },
        beforeDelete: async (user: User) => {
          await devlog.info("BEFORE_DELETE", { user });
        },
        afterDelete: async (user: User) => {
          await devlog.info("AFTER_DELETE", { user });
        },
      },
    },
  },

  session: {
    modelName: "Session",
    // cookieCache: {
    //   enabled: true,
    //   maxAge: 60 * 5, // 5 minutes
    // },
  },

  account: {
    modelName: "Account",
    accountLinking: {
      enabled: true,
      trustedProviders: ["email-password", "google", "github"],
      allowDifferentEmails: true,
      allowUnlinkingAll: true,
    },
    updateAccountOnSignIn: true,
  },

  // https://better-auth.com/docs/reference/options#verification
  verification: {
    modelName: "Verification",
    disableCleanup: false,
  },

  // https://better-auth.com/docs/concepts/rate-limit
  // rateLimit: {
  //   enabled: isProd,
  //   window: 60,
  //   max: 100,
  //   storage: "database",
  //   modelName: "RateLimit",
  // },

  // https://better-auth.com/docs/authentication/email-password
  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,

    // https://better-auth.com/docs/reference/options#emailandpassword
    sendResetPassword: async ({ user, url, token }) => {
      await devlog.info("SEND_RESET_PASSWORD_EMAIL", { user, url, token });
    },
    resetPasswordTokenExpiresIn: 3600, // 1 hour
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      await devlog.info("SEND_VERIFICATION_EMAIL", {
        email: user.email,
        url,
        token,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },

  // Configure more in @/config/site.tsx
  socialProviders: {
    github: {
      clientId: envServer.GITHUB_CLIENT_ID,
      clientSecret: envServer.GITHUB_CLIENT_SECRET,
      mapProfileToUser: (profile) => {
        const { firstName, lastName } = getNameParts(profile.name);
        const usernameGitHub = createUsernameGitHub(profile.login);

        return {
          username: usernameGitHub,
          displayUsername: usernameGitHub,
          firstName,
          lastName,
        };
      },
    },
    google: {
      clientId: envServer.GOOGLE_CLIENT_ID,
      clientSecret: envServer.GOOGLE_CLIENT_SECRET,
      mapProfileToUser: (profile) => {
        const usernameGoogle = createUsername(
          profile.given_name,
          profile.family_name
        );

        return {
          username: usernameGoogle,
          displayUsername: usernameGoogle,
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    },
  },

  plugins: [
    admin(),
    haveIBeenPwned(),

    // https://better-auth.com/docs/plugins/multi-session
    multiSession(),

    // https://better-auth.com/docs/plugins/open-api
    openAPI(), // Available on /api/auth/reference

    inferAdditionalFields({
      user: {
        phoneNumber: {
          type: "string",
          required: false,
        },
      },
    }),

    // https://better-auth.com/docs/plugins/anonymous
    anonymous({
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        // Move data from anonymous user to the new user
        await devlog.info("ANONYMOUS_USER_LINKED", { anonymousUser, newUser });
      },
    }),

    // https://better-auth.com/docs/plugins/username
    username({
      minUsernameLength: configSchema.username.min,
      maxUsernameLength: configSchema.username.max,
      usernameValidator: (usernameToValidate) => {
        if (usernameToValidate === "admin") return false;
        return true;
      },
    }),

    // https://better-auth.com/docs/plugins/email-otp
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type }) => {
        await devlog.info("SEND_OTP_EMAIL", { email, otp, type });
      },
    }),

    // https://better-auth.com/docs/plugins/magic-link
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        await devlog.info("SEND_MAGIC_LINK", { email, token, url, request });
      },
    }),

    // https://better-auth.com/docs/plugins/phone-number
    phoneNumber({
      sendOTP: async ({ phoneNumber: phone, code }) => {
        await devlog.info("SEND_OTP_SMS", { phone, code });
      },
    }),

    // https://better-auth.com/docs/plugins/passkey
    passkey({
      schema: {
        passkey: { modelName: "Passkey" },
      },
      rpID: configSite.id,
      rpName: configSite.name,
    }),

    // https://better-auth.com/docs/plugins/2fa
    twoFactor({
      schema: {
        twoFactor: { modelName: "TwoFactor" },
      },
    }),

    // https://better-auth.com/docs/plugins/one-tap
    // TODO: How One Tap can mapProfileToUser for username?
    oneTap({
      clientId: envServer.GOOGLE_CLIENT_ID,
    }),

    // https://better-auth.com/docs/plugins/polar
    // TODO: Enable later
    // polar({
    //   client: polarClient,
    //   createCustomerOnSignUp: false, // TODO: Revisit this
    //   use: [
    //     checkout({
    //       products: [
    //         {
    //           productId: "123-456-789", // ID of Product from Polar Dashboard
    //           slug: "pro", // Custom slug, reference Checkout URL /checkout/pro
    //         },
    //       ],
    //       successUrl: "/success?checkout_id={CHECKOUT_ID}",
    //       authenticatedUsersOnly: true,
    //     }),
    //     portal(),
    //     usage(),
    //     webhooks({
    //       secret: envServer.POLAR_WEBHOOK_SECRET,
    //       // onCustomerStateChanged: (payload) => // Triggered when anything regarding a customer changes
    //       // onOrderPaid: (payload) => // Triggered when an order was paid (purchase, subscription renewal, etc.)
    //       // // ...  // Over 25 granular webhook handlers
    //       // onPayload: (payload) => // Catch-all for all events
    //     }),
    //   ],
    // }),
  ],
});
