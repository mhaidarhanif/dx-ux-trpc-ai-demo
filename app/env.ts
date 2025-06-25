import { createEnv } from "@t3-oss/env-core";
import z from "zod/v4";

export const isDev = import.meta.env.DEV;
export const isProd = import.meta.env.PROD;

export const envClient = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_APP_URL: z.url(),
  },
  runtimeEnv: import.meta.env,
});
