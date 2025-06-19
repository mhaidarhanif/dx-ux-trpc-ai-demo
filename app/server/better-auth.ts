import { betterAuth as betterAuthConfig } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, anonymous, haveIBeenPwned, multiSession, openAPI, twoFactor, username } from "better-auth/plugins";

import { prisma } from "@/server/prisma";

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
      lang: {
        type: "string",
        required: false,
        defaultValue: "en",
      },
      theme: {
        type: "string",
        required: false,
        defaultValue: "",
      },
    },
  },
  session: {
    modelName: "Session",
  },
  account: {
    modelName: "Account",
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.name.split(" ")[0],
          lastName: profile.name.split(" ")[1],
        };
      },
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
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
    haveIBeenPwned({
      customPasswordCompromisedMessage: "That password is compromised. Please choose a more secure one.",
    }),
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
