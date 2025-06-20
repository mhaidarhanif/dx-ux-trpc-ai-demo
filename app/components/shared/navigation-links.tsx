import { NavLink } from "react-router";
import type { NavLinkItem } from "@/config/site";
import { useAuthUser } from "@/hooks/use-auth-user";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export function NavigationLinks({ items }: { items: NavLinkItem[] }) {
  const [{ isAuthenticated }] = useAuthUser();

  return (
    <ul className="inline-flex gap-2 font-brand">
      {items
        .filter((item) => {
          if (item.auth === true) return isAuthenticated;
          if (item.auth === false) return !isAuthenticated;
          return true;
        })
        .map((item) => (
          <li key={item.to}>
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "whitespace-nowrap font-normal",
                  isActive && "text-primary"
                )
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
    </ul>
  );
}
