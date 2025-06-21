import * as React from "react";
import { type LinkProps, NavLink, useNavigate } from "react-router";
import { IconMenuAnimated } from "@/components/shared/icon-menu-animated";
import { LogoNavigationLink } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { configSite, type NavItem } from "@/config/site";
import { useAuthUser } from "@/hooks/use-auth-user";
import { filterNavItems } from "@/lib/navlink";
import { cn } from "@/lib/utils";

export function NavigationMobile() {
  const [open, setOpen] = React.useState(false);

  return (
    <nav
      id="navigation-mobile"
      className={cn(
        "bg-background p-2",
        "flex w-full items-center justify-between"
      )}
    >
      <LogoNavigationLink />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "extend-touch-target touch-manipulation items-center justify-start gap-2.5"
            )}
          >
            <div className="relative flex items-center justify-center">
              <span className="sr-only">Toggle Menu</span>
              <IconMenuAnimated open={open} />
            </div>

            <span className="flex items-center font-medium text-lg leading-none">
              Menu
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none bg-background/90 p-0 shadow-none backdrop-blur duration-100"
          align="start"
          side="bottom"
          alignOffset={-16}
          sideOffset={8}
        >
          <div className="flex flex-col gap-12 overflow-auto p-4">
            <NavSection
              title="Menu"
              items={configSite.navItems}
              onOpenChange={setOpen}
            />
            <NavSection
              title="Auth"
              items={configSite.navAuthItems}
              onOpenChange={setOpen}
            />
          </div>
        </PopoverContent>
      </Popover>
    </nav>
  );
}

function NavSection({
  title,
  items,
  onOpenChange,
}: {
  title: string;
  items: NavItem[];
  onOpenChange: (open: boolean) => void;
}) {
  const { isAuthenticated } = useAuthUser();

  return (
    <section className="flex flex-col items-end gap-4">
      <span className="font-medium text-muted-foreground text-sm">{title}</span>
      <ul className="flex flex-col gap-3 text-right">
        {filterNavItems(items, isAuthenticated).map((item, index) => (
          <li key={index} className="flex w-full justify-end">
            <NavLinkMobile to={item.to} onOpenChange={onOpenChange}>
              {item.label}
            </NavLinkMobile>
          </li>
        ))}
      </ul>
    </section>
  );
}

function NavLinkMobile({
  to,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const navigate = useNavigate();
  return (
    <NavLink
      to={to}
      onClick={() => {
        navigate(to);
        onOpenChange?.(false);
      }}
      className={cn("font-medium text-2xl", className)}
      {...props}
    >
      {children}
    </NavLink>
  );
}
