import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

import ArrowLeft from "@/icons/arrow-left";
import ArrowRight from "@/icons/arrow-right";
import Calendar from "@/icons/calendar";
import Check from "@/icons/check";
import ChevronDown from "@/icons/chevron-down";
import ChevronLeft from "@/icons/chevron-left";
import ChevronRight from "@/icons/chevron-right";
import ChevronUp from "@/icons/chevron-up";
import Circle from "@/icons/circle";
import Code from "@/icons/code-fill";
import Copy from "@/icons/copy";
import Ellipsis from "@/icons/ellipsis";
import EllipsisVertical from "@/icons/ellipsis-vertical";
import Eye from "@/icons/eye";
import EyeOff from "@/icons/eye-off";
import GitHub from "@/icons/github-fill";
import Globe from "@/icons/globe";
import Google from "@/icons/google-fill";
import GripVertical from "@/icons/grip-vertical";
import KeyRound from "@/icons/key-round";
import Linkedin from "@/icons/linkedin-fill";
import Loader from "@/icons/loader";
import LoaderCircle from "@/icons/loader-circle";
import LoaderPinwheel from "@/icons/loader-pinwheel";
import Minus from "@/icons/minus";
import Monitor from "@/icons/monitor";
import Moon from "@/icons/moon";
import PanelLeft from "@/icons/panel-left";
import Pipette from "@/icons/pipette";
import Search from "@/icons/search";
import Star from "@/icons/star-fill";
import Sun from "@/icons/sun";
import Trash from "@/icons/trash";
import X from "@/icons/x";

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
