import type { FieldMetadata } from "@conform-to/react";

export function FieldErrors({
  children: field,
}: {
  children: FieldMetadata<string>;
}) {
  return (
    <>
      {field.errors &&
        field.errors?.length > 0 &&
        field.errors?.map((error, index) => (
          <div
            className="text-destructive text-xs"
            id={field.errorId}
            key={index}
          >
            <p>{error}</p>
          </div>
        ))}
    </>
  );
}
