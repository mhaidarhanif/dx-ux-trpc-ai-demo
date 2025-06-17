import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/layout-root.tsx", [
    index("routes/home.tsx"),
    route("/about", "routes/about.tsx"),
    route("/examples", "routes/examples.tsx"),

    route("/signup", "routes/signup.tsx"),
    route("/signin", "routes/signin.tsx"),
    route("/signout", "routes/signout.tsx"),
    route("/user", "routes/user.tsx"),

    route("/api/auth/*", "routes/api/auth.ts"),
    route("/api/trpc/*", "routes/api/trpc.ts"),
  ]),
] satisfies RouteConfig;
