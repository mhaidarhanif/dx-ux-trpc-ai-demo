import type { NavItem } from "@/config/site";

export function filterNavItems(items: NavItem[], isAuthenticated: boolean) {
  return items.filter((item) => {
    if (item.auth === true) return isAuthenticated;
    if (item.auth === false) return !isAuthenticated;
    return true;
  });
}
