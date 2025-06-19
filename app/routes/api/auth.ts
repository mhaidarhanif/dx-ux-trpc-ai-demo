import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

import { betterAuth } from "@/server/better-auth";

export async function loader({ request }: LoaderFunctionArgs) {
  return betterAuth.handler(request);
}

export async function action({ request }: ActionFunctionArgs) {
  return betterAuth.handler(request);
}
