import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Icons } from "@/lib/icons";
import { stringifyCode } from "@/lib/string";
import { cn } from "@/lib/utils";

/**
 * Debug Code
 *
 * Preformat code component to show debugging information.
 */

export function DebugCode({
  children,
  className,
  hidden = false,
  isCollapsibleOpen = false,
  name,
}: {
  children?: string | object;
  hidden?: boolean;
  isAlwaysShow?: boolean;
  isCollapsibleOpen?: boolean;
  name?: string;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(!hidden);
  const [isOpen, setIsOpen] = useState(isCollapsibleOpen);

  if (!isVisible) return null;

  return (
    <div>
      <Collapsible className="space-y-1" onOpenChange={setIsOpen} open={isOpen}>
        <div className="flex flex-nowrap gap-1">
          <CollapsibleTrigger
            className={cn(buttonVariants({ variant: "outline", size: "xs" }))}
          >
            <span>DEBUG</span>
            {name && <span>: {name}</span>}
          </CollapsibleTrigger>

          <Button
            onClick={() => setIsVisible(false)}
            size="icon-xs"
            variant="outline"
          >
            <Icons.X className="size-3" />
          </Button>
        </div>

        <CollapsibleContent>
          <pre
            className={cn(
              "max-h-96 max-w-md",
              "break-spaces my-1 overflow-scroll rounded-xl border border-surface-200 bg-white p-1 text-3xs dark:border-surface-800 dark:bg-black",
              className
            )}
          >
            <code>{stringifyCode(children)}</code>
          </pre>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
