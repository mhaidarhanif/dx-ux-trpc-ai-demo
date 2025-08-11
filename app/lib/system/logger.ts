/** biome-ignore-all lint/suspicious/noConsole: "This is fine" */
import { isProd } from "@/modules/env/env";

export const devlog = {
  infoAlways: (...args: unknown[]) => {
    console.log(...args);
  },
  info: (...args: unknown[]) => {
    if (!isProd) console.log(...args);
  },
  warn: (...args: unknown[]) => {
    if (!isProd) console.warn(...args);
  },
  error: (...args: unknown[]) => {
    if (!isProd) console.error(...args);
  },
};
