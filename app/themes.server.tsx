import { createCookieSessionStorage } from "react-router";
import { createThemeSessionResolver } from "remix-themes";
import { envServer, isProd } from "@/env.server";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "themes",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: isProd ? true : undefined,
    domain: isProd ? envServer.APP_URL : undefined,
    secrets: [envServer.BETTER_AUTH_SECRET],
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
