import type { Config } from "@react-router/dev/config";
// import { vercelPreset } from "@vercel/react-router/vite";

export default {
  ssr: true,
  presets: [
    /**
     * Enable it only if using Vercel
     *
     * The main difference the build will output like:
     * `build/server/nodejs_eyJydW50aW1lIjoibm9kZWpzIn0/`
     */
    // vercelPreset(),
  ],
} satisfies Config;
