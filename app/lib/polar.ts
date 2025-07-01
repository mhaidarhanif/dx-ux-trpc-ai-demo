import { Polar } from "@polar-sh/sdk";
import { isDev } from "@/modules/env/env";
import { envServer } from "@/modules/env/env.server";

export const polarClient = new Polar({
  accessToken: envServer.POLAR_ACCESS_TOKEN,
  server: isDev ? "sandbox" : "production",
});
