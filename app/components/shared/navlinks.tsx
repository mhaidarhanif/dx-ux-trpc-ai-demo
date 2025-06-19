import { type href, NavLink } from "react-router";

import { cn } from "@/lib/utils";

export type NavLinkItem = {
  to: ReturnType<typeof href>;
  text: string;
  auth?: boolean;
};

export function NavLinks({
  items,
  isAuthenticated = true,
}: {
  items: NavLinkItem[];
  isAuthenticated?: boolean;
}) {
  return (
    <ul className="inline-flex gap-4 font-brand">
      {items
        .filter((item) => {
          if (item.auth === true) return isAuthenticated;
          if (item.auth === false) return !isAuthenticated;
          return true;
        })
        .map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                cn("whitespace-nowrap font-normal", isActive && "text-primary")
              }
            >
              {item.text}
            </NavLink>
          </li>
        ))}
    </ul>
  );
}
