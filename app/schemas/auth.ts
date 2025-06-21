import z from "zod/v4";
import { configSchema } from "@/config/schema";
import { configSite } from "@/config/site";

export const AuthSocialSchema = z.object({
  provider: z.enum(configSite.socialProviders),
});

export const AuthFormSchema = z.object({
  name: z.string(),
  username: z
    .string()
    .min(configSchema.username.min)
    .max(configSchema.username.max),
  email: z.email(),
  password: z
    .string()
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
