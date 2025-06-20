import { Outlet } from "react-router";

export default function LayoutPadded() {
  return (
    <div className="flex flex-col items-center justify-center gap-20 px-4 pt-20 pb-40">
      <Outlet />
    </div>
  );
}
