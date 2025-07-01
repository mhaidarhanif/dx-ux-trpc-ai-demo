import { useState } from "react";
import { useFetcher, useLocation } from "react-router";
import { ButtonLoading } from "@/components/buttons/button-loading";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";

export function FormDelete({
  dialogTrigger,
  action,
  itemText,
  name = "id",
  defaultValue,
  buttonText = "Delete",
  disabled,
  extraComponent,
  className,
}: {
  dialogTrigger?: React.ReactNode;
  action: string; // Example: /action/user/examples/delete
  itemText: string; // Example: Post Title
  name?: string; // Optional: Can be with/without input name=id
  defaultValue?: string; // Optional: Can be with/without value
  buttonText?: string;
  disabled?: boolean;
  extraComponent?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState<boolean>();
  const location = useLocation();
  const fetcher = useFetcher();

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild className={className}>
        {dialogTrigger ? (
          dialogTrigger
        ) : (
          <Button disabled={disabled} size="xs" variant="outline">
            <Icons.Trash />
            <span>{buttonText}</span>
          </Button>
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {itemText}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {itemText}. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <fetcher.Form
            action={action || location.pathname}
            method="DELETE"
            onSubmit={(event) => {
              fetcher.submit(event.currentTarget.form, { method: "DELETE" });
              setOpen(false);
            }}
          >
            {name && defaultValue && (
              <input defaultValue={defaultValue} name={name} type="hidden" />
            )}

            {extraComponent}

            <ButtonLoading
              fetcher={fetcher}
              size="sm"
              submittingText="Deleting"
              type="submit"
              variant="destructive"
            >
              Delete
            </ButtonLoading>
          </fetcher.Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
