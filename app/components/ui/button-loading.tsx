import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import { Button, type buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner-icon";

interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading: boolean;
  loadingText: React.ReactNode;
  isDisabledWhenLoading?: boolean;
  icon?: React.ReactNode;
}

const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  (
    {
      isDisabledWhenLoading = true,
      isLoading = false,
      loadingText = "",
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const isActive = isDisabledWhenLoading ? isLoading : isDisabledWhenLoading;

    return (
      <Button ref={ref} disabled={isActive} {...props}>
        {icon && icon}
        {!icon && isActive && <Spinner />}
        {isLoading ? loadingText : children}
      </Button>
    );
  }
);
ButtonLoading.displayName = "ButtonLoading";

export { ButtonLoading };
