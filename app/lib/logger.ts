/** biome-ignore-all lint/suspicious/noExplicitAny: "This is fine" */
/** biome-ignore-all lint/suspicious/noConsole: "This is fine" */
const isProd = process.env.NODE_ENV === "production";

export const devlog = {
  info: (...args: any[]) => {
    if (!isProd) console.log(...args);
  },
  warn: (...args: any[]) => {
    if (!isProd) console.warn(...args);
  },
  error: (...args: any[]) => {
    if (!isProd) console.error(...args);
  },
};
