import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Button, type buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner-icon";
import { useIsSubmitting } from "@/hooks/use-is-submitting";

interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  hasSpinner?: boolean;
  submittingText?: React.ReactNode;
  isSubmittingOverride?: boolean;
}

const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  (
    {
      hasSpinner = true,
      submittingText = "",
      isSubmittingOverride,
      children,
      ...props
    },
    ref
  ) => {
    const isSubmittingGlobal = useIsSubmitting();
    const isSubmitting = isSubmittingOverride || isSubmittingGlobal;

    return (
      <Button ref={ref} disabled={isSubmitting} {...props}>
        {!isSubmitting && children}
        {isSubmitting && (
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
