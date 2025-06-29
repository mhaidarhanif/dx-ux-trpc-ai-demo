import { cn } from "@/lib/utils";

export function Flex({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <div className={cn("flex flex-wrap gap-1", className)} {...props}>
      {children}
    </div>
  );
}
