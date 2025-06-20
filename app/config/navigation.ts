import { href } from "react-router";

export type NavLinkItem = {
  to: ReturnType<typeof href>;
  label: string;
  auth?: boolean;
};

export const navLinkItems: NavLinkItem[] = [
  { to: href("/"), label: "Home" },
  { to: href("/about"), label: "About" },
  { to: href("/examples"), label: "Examples" },
  { to: "/404", label: "404" },
];

export const authNavLinkItems: NavLinkItem[] = [
  { to: href("/signup"), label: "Sign Up", auth: false },
  { to: href("/signin"), label: "Sign In", auth: false },
  { to: href("/signout"), label: "Sign Out", auth: true },
  { to: href("/dashboard"), label: "Dashboard", auth: true },
];
