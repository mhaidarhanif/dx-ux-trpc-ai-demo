import type { ReactNode } from "react";
import { Anchor } from "@/components/shared/anchor";

interface FigureImageProps extends React.ComponentProps<"figure"> {
  alt: string;
  caption?: ReactNode;
  creditHref?: string;
  creditLabel?: ReactNode;
  src: string;
}

export function FigureImage({
  alt,
  caption,
  creditHref,
  creditLabel,
  src,
  ...props
}: FigureImageProps) {
  return (
    <figure {...props}>
      <img alt={alt} className="rounded-sm" src={src} />
      {(caption || creditHref) && (
        <figcaption>
          {caption}
          {caption && creditHref && " — "}
          {creditHref && (
            <Anchor href={creditHref}>{creditLabel || creditHref}</Anchor>
          )}
        </figcaption>
      )}
    </figure>
  );
}
