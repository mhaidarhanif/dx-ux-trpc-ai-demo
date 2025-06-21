import { CheckIcon, MinusIcon, XIcon } from "lucide-react";

export function IconBooleanValue({
  children,
}: {
  children: string | number | boolean | null;
}) {
  const valueIsBoolean = typeof children === "boolean";

  if (!valueIsBoolean) {
    return children ? children : <MinusIcon />;
  }
  if (children) {
    return <CheckIcon className="text-green-600 dark:text-green-400" />;
  }
  return <XIcon className="text-red-600 dark:text-red-400" />;
}
