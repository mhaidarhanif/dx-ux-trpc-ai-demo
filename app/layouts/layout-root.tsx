import { href, NavLink, Outlet } from "react-router";
import { cn } from "@/lib/utils";
import { auth } from "@/utils/auth/server";
import { caller } from "@/utils/trpc/server";
import type { Route } from "./+types/layout-root";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return { isAuthenticated: false, user: null };

  const api = await caller(request);
  const user = await api.greeting.user();
  const isAuthenticated = user !== null;

  return { isAuthenticated, user };
}

const navLinks = [
  { to: href("/"), text: "Home" },
  { to: href("/examples"), text: "Examples" },
  { to: href("/signup"), text: "Sign Up", auth: false },
  { to: href("/signin"), text: "Sign In", auth: false },
  { to: href("/signout"), text: "Sign Out", auth: true },
  { to: href("/user"), text: "User", auth: true },
];

export default function LayoutRoot({ loaderData }: Route.ComponentProps) {
  const { isAuthenticated } = loaderData;

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-3 px-6 flex items-center gap-4">
        {navLinks
          .filter((link) => {
            if (link.auth === true) return isAuthenticated;
            if (link.auth === false) return !isAuthenticated;
            return true;
          })
          .map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn("font-bold", isActive && "text-primary")
              }
            >
              {link.text}
            </NavLink>
          ))}
      </nav>

      <main className="flex-auto">
        <Outlet />
      </main>

      <footer className="p-4">
        <p className="text-sm">&copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
