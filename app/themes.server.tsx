import { createCookieSessionStorage } from "react-router";
import { createThemeSessionResolver } from "remix-themes";

const isProduction = process.env.NODE_ENV === "production";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "dogokit_theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["change_this_secret"],
    ...(isProduction ? { domain: "example.com", secure: true } : {}),
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
