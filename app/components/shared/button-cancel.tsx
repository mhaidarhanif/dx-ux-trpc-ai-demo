import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { useNavigate } from "react-router";
import { Button, type buttonVariants } from "@/components/ui/button";

interface ButtonCancelProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const ButtonCancel = React.forwardRef<HTMLButtonElement, ButtonCancelProps>(
  (
    { variant = "secondary", size, children = "Cancel", onClick, ...props },
    ref
  ) => {
    const navigate = useNavigate();

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(e);
      }

      if (e.defaultPrevented) {
        return;
      }

      navigate(-1);
    };

    return (
      <Button
        variant={variant}
        size={size}
        ref={ref}
        onClick={handleCancel}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
ButtonCancel.displayName = "ButtonCancel";

export { ButtonCancel };
