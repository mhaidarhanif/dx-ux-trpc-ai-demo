import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, haveIBeenPwned, multiSession, openAPI, username } from "better-auth/plugins";

import { prisma } from "@/server/prisma";

export const auth = betterAuth({
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
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  plugins: [
    admin(),
    multiSession(),
    openAPI(), // Check on /api/auth/reference
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
