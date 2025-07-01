import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

import ArrowLeft from "@/components/svgs/arrow-left";
import ArrowRight from "@/components/svgs/arrow-right";
import Calendar from "@/components/svgs/calendar";
import Check from "@/components/svgs/check";
import ChevronDown from "@/components/svgs/chevron-down";
import ChevronLeft from "@/components/svgs/chevron-left";
import ChevronRight from "@/components/svgs/chevron-right";
import ChevronUp from "@/components/svgs/chevron-up";
import Circle from "@/components/svgs/circle";
import Code from "@/components/svgs/code-fill";
import Copy from "@/components/svgs/copy";
import Ellipsis from "@/components/svgs/ellipsis";
import EllipsisVertical from "@/components/svgs/ellipsis-vertical";
import Eye from "@/components/svgs/eye";
import EyeOff from "@/components/svgs/eye-off";
import GitHub from "@/components/svgs/github-fill";
import Globe from "@/components/svgs/globe";
import Google from "@/components/svgs/google-fill";
import GripVertical from "@/components/svgs/grip-vertical";
import KeyRound from "@/components/svgs/key-round";
import Linkedin from "@/components/svgs/linkedin-fill";
import Loader from "@/components/svgs/loader";
import LoaderCircle from "@/components/svgs/loader-circle";
import LoaderPinwheel from "@/components/svgs/loader-pinwheel";
import Minus from "@/components/svgs/minus";
import Monitor from "@/components/svgs/monitor";
import Moon from "@/components/svgs/moon";
import PanelLeft from "@/components/svgs/panel-left";
import Pipette from "@/components/svgs/pipette";
import Search from "@/components/svgs/search";
import Star from "@/components/svgs/star-fill";
import Sun from "@/components/svgs/sun";
import Trash from "@/components/svgs/trash";
import X from "@/components/svgs/x";

/**
 * This replace:
 * import LucideIcon, LucideProps from Lucide;
 */

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;

type ElementAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;

export type IconProps = {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
} & ElementAttributes &
  SVGProps<SVGSVGElement> &
  SVGRProps;

export type IconType = ForwardRefExoticComponent<
  Omit<IconProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export interface SVGRProps {
  title?: string;
  titleId?: string;
}

export const Icons = {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  Code,
  Copy,
  Ellipsis,
  EllipsisVertical,
  Eye,
  EyeOff,
  GitHub,
  Globe,
  Google,
  GripVertical,
  KeyRound,
  Linkedin,
  Loader,
  LoaderCircle,
  LoaderPinwheel,
  Minus,
  Monitor,
  Moon,
  PanelLeft,
  Pipette,
  Search,
  Star,
  Sun,
  Trash,
  X,
};
