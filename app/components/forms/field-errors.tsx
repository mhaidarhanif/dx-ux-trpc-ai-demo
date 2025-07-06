import type { FieldMetadata } from "@conform-to/react";

export function FieldErrors({ children }: { children: FieldMetadata<string> }) {
  return (
    <>
      {children.errors &&
        children.errors?.length > 0 &&
        children.errors?.map((error, index) => (
          <div
            className="text-destructive text-xs"
            id={children.errorId}
            key={index}
          >
            <p>{error}</p>
          </div>
        ))}
    </>
  );
}
