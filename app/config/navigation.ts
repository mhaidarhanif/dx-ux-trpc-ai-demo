export type NavItem = {
  isEnabled?: boolean;
  path: string;
  text: string;
  icon: string;
  end?: boolean;
  shortcut?: string;
};

export const configNavigationItems: NavItem[] = [
  {
    isEnabled: false,
    path: "/",
    text: "Home",
    icon: "house",
    shortcut: "⌘K+H",
  },
  {
    isEnabled: true,
    path: "/about",
    text: "About",
    icon: "info",
  },
  {
    isEnabled: true,
    path: "/examples",
    text: "Examples",
    icon: "bounding-box",
  },
  {
    isEnabled: true,
    path: "/search",
    text: "Search",
    icon: "magnifying-glass",
    shortcut: "⌘K+S",
  },
  {
    isEnabled: true,
    path: "/posts",
    text: "Posts",
    icon: "scroll",
  },
  {
    isEnabled: true,
    path: "/users",
    text: "Users",
    icon: "users-four",
  },
  {
    path: "/signup",
    text: "Sign Up",
    icon: "user-plus",
    shortcut: "⌘K+U",
  },
  {
    path: "/signin",
    text: "Sign In",
    icon: "sign-in",
    shortcut: "⌘K+I",
  },
  {
    path: "/signout",
    text: "Sign Out",
    icon: "sign-out",
    shortcut: "⌘K+O",
  },
  {
    path: "/dashboard",
    text: "Dashboard",
    icon: "binoculars",
    shortcut: "⌘K+D",
  },
  {
    path: "/dashboard/posts",
    text: "Posts",
    icon: "scroll",
    shortcut: "⌘K+P",
  },
  {
    path: "/settings",
    text: "Settings",
    icon: "gear",
    shortcut: "⌘K+S",
  },
  {
    path: "/billing",
    text: "Billing",
    icon: "credit-card",
    shortcut: "⌘K+B",
  },
  {
    path: "/notifications",
    text: "Notifications",
    icon: "notification",
    shortcut: "⌘K+N",
  },
  {
    path: "/help",
    text: "Help",
    icon: "question",
    shortcut: "⌘K+H",
  },
  {
    path: "/shortcuts",
    text: "Command Palette",
    icon: "keyboard",
    shortcut: "⌘K",
  },
  {
    path: "/user",
    text: "User",
    icon: "user",
  },
  {
    path: "/admin",
    text: "Admin",
    icon: "crown-simple",
  },
  {
    path: "/admin/dashboard",
    text: "Admin Dashboard",
    icon: "crown-simple",
  },
  {
    path: "/admin/pages",
    text: "Pages",
    icon: "rectangle",
  },
  {
    path: "/admin/users",
    text: "Users",
    icon: "users-four",
  },
  {
    path: "/admin/posts",
    text: "Posts",
    icon: "scroll",
  },
  {
    path: "/admin/settings",
    text: "Settings",
    icon: "gear",
  },
  {
    path: "/admin/notifications",
    text: "Notifications",
    icon: "notification",
  },
  {
    path: "/owner",
    text: "Owner",
    icon: "crown",
  },
  {
    path: "/owner/dashboard",
    text: "Owner Dashboard",
    icon: "crown",
  },
  {
    path: "/owner/users",
    text: "Users",
    icon: "users-four",
  },
  {
    path: "/blank",
    text: "Blank",
    icon: "square",
  },
];
