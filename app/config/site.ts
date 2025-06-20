import { href } from "react-router";

export type SiteConfig = {
  name: string;
  url: string;
  ogImage: string;
  description: string;
  links: {
    twitter: string;
    github: string;
  };
  socialProviders: string[];
  navItems: NavLinkItem[];
  navAuthItems: NavLinkItem[];
};

export type NavLinkItem = {
  to: ReturnType<typeof href>;
  label: string;
  auth?: boolean;
};

export const siteConfig: SiteConfig = {
  name: "Dogokit Corgi",
  url: "https://ui.shadcn.com",
  ogImage: "https://ui.shadcn.com/og.jpg",
  description:
    "A set of beautifully-designed, accessible components and a code distribution platform. Works with your favorite frameworks. Open Source. Open Code.",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn-ui/ui",
  },
  socialProviders: ["github", "google", "login"],
  navItems: [
    { to: href("/"), label: "Home" },
    { to: href("/about"), label: "About" },
    { to: href("/examples"), label: "Examples" },
    { to: "/404", label: "404" },
  ],
  navAuthItems: [
    { to: href("/signup"), label: "Sign Up", auth: false },
    { to: href("/signin"), label: "Sign In", auth: false },
    { to: href("/signout"), label: "Sign Out", auth: true },
    { to: href("/dashboard"), label: "Dashboard", auth: true },
  ],
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};
