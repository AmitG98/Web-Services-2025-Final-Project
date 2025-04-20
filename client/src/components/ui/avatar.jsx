import React, { forwardRef } from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { cn } from "../../lib/utils";

const UserAvatar = forwardRef(({ className, ...rest }, ref) => (
  <RadixAvatar.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...rest}
  />
));
UserAvatar.displayName = "UserAvatarRoot";

const UserAvatarImage = forwardRef(({ className, ...rest }, ref) => (
  <RadixAvatar.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...rest}
  />
));
UserAvatarImage.displayName = "UserAvatarImage";

const UserAvatarFallback = forwardRef(({ className, ...rest }, ref) => (
  <RadixAvatar.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...rest}
  />
));
UserAvatarFallback.displayName = "UserAvatarFallback";

export { UserAvatar, UserAvatarImage, UserAvatarFallback };
