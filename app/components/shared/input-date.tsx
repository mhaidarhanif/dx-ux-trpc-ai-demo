import { Input } from "@/components/ui/input";
import { Icons } from "@/lib/icons";

export function InputDate({ ...props }: React.ComponentProps<"input">) {
  return (
    <div className="relative">
      <Input type="date" {...props} />
      <Icons.Calendar className="pointer-events-none absolute inset-y-0 right-0 my-2 mr-3 flex size-5" />
    </div>
  );
}
