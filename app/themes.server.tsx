import { createCookieSessionStorage } from "react-router";
import { createThemeSessionResolver } from "remix-themes";
import { envServer, isProd } from "@/env.server";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "dogokit_corgi_theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    domain: envServer.APP_URL,
    secure: !!isProd,
    secrets: [envServer.BETTER_AUTH_SECRET],
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
