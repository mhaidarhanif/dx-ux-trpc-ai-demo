import { useLocation } from "react-router";

export function getPathname(request: Request): string {
  return new URL(request.url).pathname;
}

export function usePathname(): string {
  const location = useLocation();
  return location.pathname;
}
