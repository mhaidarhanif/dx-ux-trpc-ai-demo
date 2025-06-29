import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/lib/icons";

export function InputPassword({
  placeholder = "Enter password",
  className,
  ...props
}: React.ComponentProps<"input">) {
  const [isShown, setIsShown] = useState(false);

  const handleClick = () => {
    setIsShown(!isShown);
  };

  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        type={isShown ? "text" : "password"}
        {...props}
      />
      <Button
        className="absolute inset-y-0 right-0 my-1.5 me-1.5 flex w-16 gap-0.5"
        onClick={handleClick}
        size="xs"
        type="button"
        variant="secondary"
      >
        {isShown ? <Icons.EyeOff /> : <Icons.Eye />}
        <span>{isShown ? "Hide" : "Show"}</span>
      </Button>
    </div>
  );
}
