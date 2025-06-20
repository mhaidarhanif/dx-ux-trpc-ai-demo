import { NavLink } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import type { NavLinkItem } from "@/config/site";
import { useAuthUser } from "@/hooks/use-auth-user";
import { filterNavItems } from "@/lib/navlink";
import { cn } from "@/lib/utils";

export function NavigationDesktopLinks({ items }: { items: NavLinkItem[] }) {
  const [{ isAuthenticated }] = useAuthUser();

  return (
    <ul className="inline-flex gap-2">
      {filterNavItems(items, isAuthenticated).map((item) => (
        <li key={item.to}>
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "whitespace-nowrap",
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
