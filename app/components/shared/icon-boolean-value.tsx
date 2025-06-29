import { Icons } from "@/lib/icons";

export function IconBooleanValue({
  children,
}: {
  children: string | number | boolean | null;
}) {
  const valueIsBoolean = typeof children === "boolean";

  if (!valueIsBoolean) {
    return children ? children : <Icons.Minus />;
  }
  if (children) {
    return <Icons.Check className="text-green-600 dark:text-green-400" />;
  }
  return <Icons.XIcon className="text-red-600 dark:text-red-400" />;
}
