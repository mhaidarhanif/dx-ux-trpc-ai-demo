import z from "zod/v4";
import { configSchema } from "@/config/schema";
import { configSite } from "@/config/site";

export const AuthSocialSchema = z.object({
  provider: z.enum(configSite.authProviders.map((provider) => provider.name)),
});

export const AuthFormSchema = z.object({
  name: z.string({ error: "Full name is required " }),
  username: z
    .string({ error: "Username is required" })
    .min(configSchema.username.min)
    .max(configSchema.username.max),
  email: z.email({ error: "Email is required" }),
  password: z
    .string({ error: "Password is required" })
    .min(configSchema.password.min)
    .max(configSchema.password.max),
});

export const AuthSignUpSchema = AuthFormSchema.pick({
  name: true,
  username: true,
  email: true,
  password: true,
});

export const AuthSignInSchema = AuthFormSchema.pick({
  email: true,
  password: true,
});
