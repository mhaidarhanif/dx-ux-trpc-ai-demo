import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  layout("web/layouts/layout-app.tsx", [
    layout("web/layouts/layout-padded.tsx", [
      index("web/home.tsx"),
      route("/about", "web/about.tsx"),
      route("/examples", "web/examples.tsx"),
      route("/examples/:slug", "web/examples-slug.tsx"),
    ]),

    layout("web/layouts/layout-auth.tsx", [
      route("/signup", "web/signup.tsx"),
      route("/signin", "web/signin.tsx"),
      route("/signout", "web/signout.tsx"),
      route("/forgot-password", "web/forgot-password.tsx"),
      route("/dashboard", "web/dashboard.tsx"),
    ]),

    route("*", "web/not-found.tsx"), // Custom 404
  ]),

  route("/api/auth/*", "web/api/auth.ts"),
  route("/api/trpc/*", "web/api/trpc.ts"),

  route("/action/set-theme", "web/action/set-theme.ts"),
  route("/action/social", "web/action/social.ts"),
  route("/action/example", "web/action/example.ts"),
] satisfies RouteConfig;
