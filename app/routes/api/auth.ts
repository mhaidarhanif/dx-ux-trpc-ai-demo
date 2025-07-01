import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

import { auth } from "@/modules/auth/better-auth";

export const loader = ({ request }: LoaderFunctionArgs) =>
  auth.handler(request);

export const action = ({ request }: ActionFunctionArgs) =>
  auth.handler(request);
