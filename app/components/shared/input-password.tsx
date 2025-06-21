import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        type={isShown ? "text" : "password"}
        placeholder={placeholder}
        {...props}
      />
      <Button
        type="button"
        onClick={handleClick}
        size="xs"
        variant="secondary"
        className="absolute inset-y-0 right-0 my-1.5 me-1.5 flex w-18 gap-1"
      >
        {isShown ? <EyeOffIcon /> : <EyeIcon />}
        <span>{isShown ? "Hide" : "Show"}</span>
      </Button>
    </div>
  );
}
