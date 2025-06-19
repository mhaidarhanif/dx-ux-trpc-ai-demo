import { index, layout, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  layout("layouts/layout-root.tsx", [
    layout("layouts/layout-padded.tsx", [
      index("routes/home.tsx"),
      route("/about", "routes/about.tsx"),
      route("/examples", "routes/examples.tsx"),
    ]),

    layout("layouts/layout-auth.tsx", [
      route("/signup", "routes/signup.tsx"),
      route("/signin", "routes/signin.tsx"),
      route("/signout", "routes/signout.tsx"),
      route("/dashboard", "routes/dashboard.tsx"),
    ]),

    route("*", "routes/404.tsx"),
  ]),

  route("/action/set-theme", "routes/action/set-theme.ts"),
  route("/api/auth/*", "routes/api/auth.ts"),
  route("/api/trpc/*", "routes/api/trpc.ts"),
] satisfies RouteConfig;
