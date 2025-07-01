import type { User } from "better-auth";
import { cva, type VariantProps } from "class-variance-authority";
import type { Avatar as AvatarPrimitive } from "radix-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarPlaceholderUrl } from "@/lib/image/placeholder";
import { getNameInitials } from "@/lib/text/convert";
import { cn } from "@/lib/utils";

export const avatarAutoVariants = cva("", {
  variants: {
    size: {
      xs: "size-6",
      sm: "size-8",
      default: "size-12",
      lg: "size-20",
      xl: "size-28",
    },
  },
  compoundVariants: [
    { size: "xs", class: "text-base" },
    { size: "sm", class: "text-sm" },
    { size: "default", class: "text-2xl" },
    { size: "lg", class: "text-3xl" },
    { size: "xl", class: "text-4xl" },
  ],
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarAutoVariants> {
  user: User;
  imageUrl?: string | null;
}

/**
 * Image URL is flexible enough to be sourced from any source:
 * - placeholder function
 * - user.images[0]?.url
 */
export function UserAvatar({
  user,
  size,
  className,
  ...props
}: UserAvatarProps) {
  const imageUrl = user.image || getAvatarPlaceholderUrl(user.name) || "";

  return (
    <Avatar
      className={cn(avatarAutoVariants({ size }), "bg-secondary", className)}
      {...props}
    >
      <AvatarImage alt={user.name} className="bg-secondary" src={imageUrl} />
      {!imageUrl && (
        <AvatarFallback className="bg-secondary">
          {getNameInitials(user.name)}
        </AvatarFallback>
      )}
    </Avatar>
  );
}

export function AvatarAutoNext({
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
  const userImageText = user.name || user.email || "user";

  const userImageSource = user.image || getAvatarPlaceholderUrl(userImageText);

  const userImageFallback = user.name?.[0] || user.email?.[0] || "?";

  return (
    <Avatar className={cn("rounded-lg", className)} {...props}>
      <AvatarImage
        alt={user.name || user.email || "User avatar"}
        src={userImageSource}
      />
      <AvatarFallback>{userImageFallback}</AvatarFallback>
    </Avatar>
  );
}
