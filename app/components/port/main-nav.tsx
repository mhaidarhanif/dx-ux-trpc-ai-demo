import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: { to: string; label: string }[];
}) {
  const pathname = useLocation().pathname;

  return (
    <nav className={cn("items-center gap-0.5", className)} {...props}>
      {items.map((item) => (
        <Button asChild key={item.to} variant="ghost" size="sm">
          <Link
            to={item.to}
            className={cn(pathname === item.to && "text-primary")}
          >
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
