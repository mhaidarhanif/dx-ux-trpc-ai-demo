import { createThemeAction } from "remix-themes";

import { themeSessionResolver } from "@/modules/theme/themes-cookie.server";

export const action = createThemeAction(themeSessionResolver);
