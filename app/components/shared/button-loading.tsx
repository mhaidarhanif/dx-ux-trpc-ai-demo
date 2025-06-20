import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { useNavigation } from "react-router";
import { Button, type buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner-icon";

interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  submittingText?: React.ReactNode;
}

const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  ({ submittingText = "", children, ...props }, ref) => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
      <Button ref={ref} disabled={isSubmitting} {...props}>
        {isSubmitting && <Spinner />}
        {isSubmitting ? submittingText : children}
      </Button>
    );
  }
);
ButtonLoading.displayName = "ButtonLoading";

export { ButtonLoading };
