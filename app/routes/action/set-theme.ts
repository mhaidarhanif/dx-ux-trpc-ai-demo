import { createThemeAction } from "remix-themes";

import { themeSessionResolver } from "@/themes.server";

export const action = createThemeAction(themeSessionResolver);
