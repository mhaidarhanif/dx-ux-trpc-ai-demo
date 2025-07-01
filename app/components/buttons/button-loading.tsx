import type { VariantProps } from "class-variance-authority";
import React from "react";
import { type FetcherWithComponents, useNavigation } from "react-router";
import { Button, type buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner-icon";
import { cn } from "@/lib/utils";

interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  hasSpinner?: boolean;
  submittingText?: React.ReactNode;
  fetcher?: FetcherWithComponents<unknown>;
}

const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  (
    { hasSpinner = true, submittingText, fetcher, size, children, ...props },
    ref
  ) => {
    const navigation = useNavigation();
    const theObject = fetcher || navigation;
    const isSubmitting = theObject.state === "submitting";

    return (
      <Button disabled={isSubmitting} ref={ref} size={size} {...props}>
        {!isSubmitting && children}
        {isSubmitting && (
          <>
            {hasSpinner && (
              <Spinner className={cn(size?.toString() === "xs" && "size-2")} />
            )}
            {submittingText || children}
          </>
        )}
      </Button>
    );
  }
);
ButtonLoading.displayName = "ButtonLoading";

export { ButtonLoading };
