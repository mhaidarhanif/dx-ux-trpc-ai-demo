import z from "zod/v4";

export const AuthSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export const AuthSignUpSchema = AuthSchema.pick({
  name: true,
  username: true,
  email: true,
  password: true,
});

export const AuthSignInSchema = AuthSchema.pick({
  email: true,
  password: true,
});
