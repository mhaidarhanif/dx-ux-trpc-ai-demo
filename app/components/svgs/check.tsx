import type { IconProps } from "@/lib/icons";

const SvgCheck = ({ title, titleId, ...props }: IconProps) => (
  <svg
    aria-labelledby={titleId}
    height="1em"
    viewBox="0 0 24 24"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M20 6 9 17l-5-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);
export default SvgCheck;
