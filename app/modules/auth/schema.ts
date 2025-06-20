import z from "zod/v4";
import { configSite } from "@/config/site";

export const AuthSocialSchema = z.object({
  provider: z.enum(configSite.socialProviders),
});

export const AuthFormSchema = z.object({
  name: z.string(),
  username: z.string().min(8).max(128),
  email: z.email(),
  password: z.string(),
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
