import { betterAuth as betterAuthConfig } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {
  admin,
  anonymous,
  haveIBeenPwned,
  multiSession,
  openAPI,
  twoFactor,
  username,
} from "better-auth/plugins";
import { createUsername, createUsernameGitHub } from "@/lib/string";
import { prisma } from "@/server/prisma";

export type BetterAuthResponse = {
  code: string;
  message: string;
};

export type BetterAuthResponseSignOut = {
  success: string;
};

export const betterAuth = betterAuthConfig({
  appName: "Dogokit Corgi",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  advanced: {
    database: {
      generateId: false,
    },
  },

  user: {
    modelName: "User",
    additionalFields: {
      firstName: { type: "string", required: false },
      lastName: { type: "string", required: false },
      lang: { type: "string", required: false, defaultValue: "en" },
      theme: { type: "string", required: false, defaultValue: "" },
    },
  },
  session: {
    modelName: "Session",
  },
  account: {
    modelName: "Account",
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        const nameParts = profile.name.split(" ");
        return {
          username: createUsernameGitHub(profile.login),
          firstName: nameParts.slice(0, -1).join(" "),
          lastName: nameParts.slice(-1).join(" "),
        };
      },
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          username: createUsername(profile.given_name, profile.family_name),
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    },
  },

  plugins: [
    anonymous(),
    admin(),
    multiSession(),
    openAPI(), // Check on /api/auth/reference
    twoFactor(),
    haveIBeenPwned(),
    username({
      minUsernameLength: 2,
      maxUsernameLength: 20,
      usernameValidator: (username) => {
        if (username === "admin") {
          return false;
        } else {
          return true;
        }
      },
    }),
  ],
});
