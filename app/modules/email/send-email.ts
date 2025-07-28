import type { User } from "better-auth";
import { devlog } from "@/lib/system/logger";
import { resend } from "@/modules/email/resend";
import { envServer } from "@/modules/env/env.server";

/**
 * Send Email
 */

export async function sendEmail({
  action = "SEND_EMAIL",
  fromEmail = "onboarding@resend.dev",
  fromName = envServer.VITE_APP_NAME,
  html = "<h1>Example HTML</h1>",
  react,
  subject = "Example Subject",
  text = "Example Text",
  to,
  token,
  type,
  url,
  user,
}: {
  action?: string;
  fromEmail?: string;
  fromName?: string;
  html?: string;
  react?: React.ReactNode;
  subject: string;
  text?: string;
  to: string[];
  token?: string;
  type?: "sign-in" | "email-verification" | "forget-password";
  url?: string;
  user?: User;
}) {
  const from = `${fromName} <${fromEmail}>`;

  devlog.info(action, {
    type,
    user,
    url,
    token,
    from,
    to,
    subject,
    text,
    html,
  });

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    text,
    react,
  });

  if (error) {
    devlog.error({ error });
    return error;
  }

  devlog.info({ data });
  return data;
}
