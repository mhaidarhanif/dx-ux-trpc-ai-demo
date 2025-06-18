import { Outlet } from "react-router";

export default function LayoutAuth() {
  return (
    <div className="flex items-center justify-center gap-20 px-4 py-8">
      <Outlet />
    </div>
  );
}
