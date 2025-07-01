import type { SVGProps } from "react";

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPanelLeft = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    aria-labelledby={titleId}
    height="1em"
    viewBox="0 0 24 24"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <rect height={18} rx={2} width={18} x={3} y={3} />
      <path d="M9 3v18" />
    </g>
  </svg>
);
export default SvgPanelLeft;
