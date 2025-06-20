import z from "zod/v4";
import { siteConfig } from "@/config/site";

export const AuthSocialSchema = z.object({
  provider: z.enum(siteConfig.socialProviders),
});

export const AuthFormSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string(),
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
