import { href } from "react-router";
import IconGitHub from "@/components/icons/github-fill";
import IconGoogle from "@/components/icons/google-fill";
import IconLinkedin from "@/components/icons/linkedin-fill";
import { envClient, isProd } from "@/env";

export const configSite: ConfigSite = {
  id: isProd ? envClient.VITE_APP_URL : "localhost",
  name: envClient.VITE_APP_NAME,
  domain: envClient.VITE_APP_URL,
  url: "https://github.com/dogokit/dogokit-corgi",
  ogImage: "/og/dogokit.jpg",
  description:
    "Full stack app development kit with React Router v7 Framework, tRPC, Prisma, Better Auth, Tailwind CSS, shadcn/ui, and more.",

  links: {
    x: "https://x.com/mhaidarhanif",
    github: "https://github.com/dogokit/dogokit-corgi",
  },

  navItems: [
    { to: href("/"), label: "Home" },
    { to: href("/about"), label: "About" },
    { to: href("/examples"), label: "Examples" },
    { to: href("/*", { "*": "404" }), label: "404" },
  ],

  navAuthItems: [
    { to: href("/signup"), label: "Sign Up", auth: false },
    { to: href("/signin"), label: "Sign In", auth: false },
    { to: href("/dashboard"), label: "Dashboard", auth: true },
  ],

  authOptions: ["social", "passkey", "email", "magic", "anonymous"],

  authProviders: [
    {
      name: "google",
      label: "Google",
      icon: <IconGoogle />,
    },
    {
      name: "github",
      label: "GitHub",
      icon: <IconGitHub />,
    },
    {
      name: "linkedin",
      label: "LinkedIn",
      icon: <IconLinkedin />,
      isEnabled: false,
    },
  ],
};

export const metaThemeColor = {
  light: "#ffffff",
  dark: "#000000",
};

export type ConfigSite = {
  id: string;
  name: string;
  domain: string;
  url: string;
  ogImage?: string;
  description: string;

  links: Partial<Record<AuthProviderName, string>>;

  navItems: NavItem[];
  navAuthItems: NavItem[];

  authOptions: AuthOption[];

  authProviders: AuthProvider[];
};

export type NavItem = {
  to: ReturnType<typeof href>;
  label: string;
  auth?: boolean;
};

export type AuthOption = "social" | "passkey" | "email" | "magic" | "anonymous";

export type AuthProviderName =
  | "allnimal"
  | "apple"
  | "discord"
  | "facebook"
  | "github"
  | "gitlab"
  | "google"
  | "linkedin"
  | "microsoft"
  | "reddit"
  | "spotify"
  | "twitch"
  | "twitter"
  | "zoom"
  | "x";

export type AuthProvider = {
  name: AuthProviderName;
  label: string;
  icon: React.ReactNode;
  isEnabled?: boolean;
};
