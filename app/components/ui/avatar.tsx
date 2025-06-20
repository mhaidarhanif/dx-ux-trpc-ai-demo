import { Avatar as AvatarPrimitive } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted",
        className
      )}
      {...props}
    />
  );
}

function AvatarAuto({
  styleName = "shapes",
  user,
  className,
  ...props
}: {
  styleName?: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
} & React.ComponentProps<typeof AvatarPrimitive.Root>) {
  const userImageText = user.name || user.email || "User avatar";

  const userImageSource =
    user.image ||
    `https://api.dicebear.com/9.x/${styleName}/svg?seed=${userImageText}`;

  const userImageFallback = user.name?.[0] || user.email?.[0] || "?";

  return (
    <Avatar className={cn("rounded-lg", className)} {...props}>
      <AvatarImage
        src={userImageSource}
        alt={user.name || user.email || "User avatar"}
      />
      <AvatarFallback>{userImageFallback}</AvatarFallback>
    </Avatar>
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarAuto };
