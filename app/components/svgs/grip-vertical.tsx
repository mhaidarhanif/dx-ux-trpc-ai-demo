import type { SVGProps } from "react";

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgGripVertical = ({
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
      <circle cx={9} cy={12} r={1} />
      <circle cx={9} cy={5} r={1} />
      <circle cx={9} cy={19} r={1} />
      <circle cx={15} cy={12} r={1} />
      <circle cx={15} cy={5} r={1} />
      <circle cx={15} cy={19} r={1} />
    </g>
  </svg>
);
export default SvgGripVertical;
