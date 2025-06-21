import { cn } from "@/lib/utils";

export function ContentHeading({
  className,
  children,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "text-pretty font-bold font-brand text-4xl text-primary sm:text-5xl md:text-6xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function ContentIntro({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-pretty text-lg sm:text-xl md:text-2xl", className)}
      {...props}
    >
      {children}
    </div>
  );
}
