import { createCookieSessionStorage } from "react-router";
import { createThemeSessionResolver } from "remix-themes";
import { envServer, isProd } from "@/modules/env/env.server";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "themes",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [envServer.BETTER_AUTH_SECRET],
    ...(isProd ? { domain: envServer.DOMAIN, secure: true } : {}),
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
