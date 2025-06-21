import type { Flags } from "flagpack-core";
import Flag from "react-flagpack";

interface ImageFlagProps {
  code: Flags;
  size?: "S" | "M" | "L";
  gradient?: "" | "top-down" | "real-circular" | "real-linear";
  hasBorder?: boolean;
  hasDropShadow?: boolean;
  hasBorderRadius?: boolean;
  className?: string;
}

export function ImageFlag({
  code = "US",
  size = "S",
  hasBorderRadius = true,
  ...props
}: ImageFlagProps) {
  return <Flag code={code} {...props} />;
}
