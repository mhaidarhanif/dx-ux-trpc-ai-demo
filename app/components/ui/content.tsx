import { cn } from "@/lib/utils";

export function ContentHeadingPage({
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

export function ContentIntroParagraph({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-pretty font-brand text-lg sm:text-xl", className)}
      {...props}
    >
      {children}
    </p>
  );
}
