import * as React from "react";
import { Link, type LinkProps, useNavigate } from "react-router";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { siteConfig } from "@/config/site";
import { useAuthUser } from "@/hooks/use-auth-user";
import { cn } from "@/lib/utils";

export function NavigationMobile() {
  const [{ isAuthenticated }] = useAuthUser();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex w-full items-center justify-between">
      <Logo size="default" className="shrink-0" />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            variant="ghost"
            className={cn(
              "extend-touch-target touch-manipulation items-center justify-start gap-2.5 pr-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent"
            )}
          >
            <div className="relative flex h-8 w-4 items-center justify-center">
              <div id="menu-icon-animated" className="relative size-4">
                <span
                  className={cn(
                    "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                    open ? "-rotate-45 top-[0.4rem]" : "top-1"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                    open ? "top-[0.4rem] rotate-45" : "top-2.5"
                  )}
                />
              </div>
              <span className="sr-only">Toggle Menu</span>
            </div>
            <span className="flex h-8 items-center font-medium text-lg leading-none">
              Menu
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none bg-background/90 p-0 shadow-none backdrop-blur duration-100"
          align="start"
          side="bottom"
          alignOffset={-16}
          sideOffset={14}
        >
          <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
            <div className="flex flex-col gap-4">
              <div className="font-medium text-muted-foreground text-sm">
                Menu
              </div>
              <ul className="flex flex-col gap-3">
                {siteConfig.navItems
                  .filter((item) => {
                    if (item.auth === true) return isAuthenticated;
                    if (item.auth === false) return !isAuthenticated;
                    return true;
                  })
                  .map((item, index) => (
                    <li key={index}>
                      <MobileLink to={item.to} onOpenChange={setOpen}>
                        {item.label}
                      </MobileLink>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function MobileLink({
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
    <Link
      to={to}
      onClick={() => {
        navigate(to);
        onOpenChange?.(false);
      }}
      className={cn("font-medium text-2xl", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
