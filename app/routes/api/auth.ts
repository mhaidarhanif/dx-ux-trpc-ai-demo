import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { auth } from "@/utils/auth/server";

export async function loader({ request }: LoaderFunctionArgs) {
  return auth.handler(request);
}

export async function action({ request }: ActionFunctionArgs) {
  return auth.handler(request);
}
