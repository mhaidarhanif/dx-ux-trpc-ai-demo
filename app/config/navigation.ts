import { href } from "react-router";

export type NavLinkItem = {
  to: ReturnType<typeof href>;
  text: string;
  auth?: boolean;
};

export const navLinkItems: NavLinkItem[] = [
  { to: href("/"), text: "Home" },
  { to: href("/about"), text: "About" },
  { to: href("/examples"), text: "Examples" },
  { to: "/404", text: "404" },
];

export const authNavLinkItems: NavLinkItem[] = [
  { to: href("/signup"), text: "Sign Up", auth: false },
  { to: href("/signin"), text: "Sign In", auth: false },
  { to: href("/signout"), text: "Sign Out", auth: true },
  { to: href("/dashboard"), text: "Dashboard", auth: true },
];
