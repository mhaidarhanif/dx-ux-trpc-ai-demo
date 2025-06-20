import { redirect } from "react-router";

import { createTimer } from "@/lib/timer";

export async function loader() {
  return redirect("/signin");
}

export async function action() {
  const timer = createTimer();
  // TODO
  await timer.delay();
  return redirect("/signin");
}
