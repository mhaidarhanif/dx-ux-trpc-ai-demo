import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export function InputDate({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <div className="relative">
      <Input type="date" {...props} />
      <CalendarIcon className="pointer-events-none absolute inset-y-0 right-0 my-2 mr-3 flex size-5" />
    </div>
  );
}
