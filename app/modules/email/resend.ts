import { Resend } from "resend";
import { envServer } from "@/modules/env/env.server";

export const resend = new Resend(envServer.RESEND_API_KEY);
