import { createThemeAction } from "remix-themes";

import { themeSessionResolver } from "@/modules/themes/themes.server";

export const action = createThemeAction(themeSessionResolver);
