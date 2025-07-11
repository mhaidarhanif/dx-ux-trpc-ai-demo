import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

export default {
  ssr: true,
  presets: [
    vercelPreset(), // Remove if not using Vercel
  ],
} satisfies Config;
