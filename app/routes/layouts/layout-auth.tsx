import { Outlet } from "react-router";

export default function LayoutAuthRoute() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-8">
      <Outlet />
    </div>
  );
}
