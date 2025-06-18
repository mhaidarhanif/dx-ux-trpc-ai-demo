import { href, NavLink, Outlet } from "react-router";
import ThemeToggle from "@/components/shared/theme-toggle";
import { cn } from "@/lib/utils";
import { requireAuth } from "@/utils/auth/helper";
import type { Route } from "./+types/layout-root";

export async function loader({ request }: Route.LoaderArgs) {
  return requireAuth(request);
}

const navLinks = [
  { to: href("/"), text: "Home" },
  { to: href("/about"), text: "About" },
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
      <nav className="flex items-center justify-between gap-4 border-gray-200 border-b bg-gray-100 px-6 py-3 dark:border-gray-800 dark:bg-gray-900">
        <ul className="inline-flex gap-4">
          {navLinks
            .filter((link) => {
              if (link.auth === true) return isAuthenticated;
              if (link.auth === false) return !isAuthenticated;
              return true;
            })
            .map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn("font-bold", isActive && "text-primary")
                  }
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
        </ul>
        <div>
          <ThemeToggle />
        </div>
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
