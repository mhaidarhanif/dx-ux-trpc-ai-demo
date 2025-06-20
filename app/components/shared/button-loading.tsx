import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { useNavigation } from "react-router";
import { Button, type buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner-icon";

interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  hasSpinner?: boolean;
  submittingText?: React.ReactNode;
  isSubmitting?: boolean;
}

const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  (
    {
      hasSpinner = true,
      submittingText = "",
      isSubmitting,
      children,
      ...props
    },
    ref
  ) => {
    const navigation = useNavigation();
    const isSubmittingValue = isSubmitting || navigation.state === "submitting";

    return (
      <Button ref={ref} disabled={isSubmittingValue} {...props}>
        {!isSubmittingValue && children}
        {isSubmittingValue && (
          <>
            {hasSpinner && <Spinner />}
            {submittingText || children}
          </>
        )}
      </Button>
    );
  }
);
ButtonLoading.displayName = "ButtonLoading";

export { ButtonLoading };
