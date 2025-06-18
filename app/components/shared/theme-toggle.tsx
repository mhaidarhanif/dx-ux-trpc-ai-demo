import { useEffect } from "react";
import { Theme, useTheme } from "remix-themes";

export function ThemeToggle() {
  const [theme, setTheme, themeMetaData] = useTheme();
  const { definedBy } = themeMetaData;

  useEffect(() => {
    console.info("THEME", { theme, definedBy });
  }, [definedBy, theme]);

  return (
    <div>
      <label className="flex items-center gap-2">
        <select
          name="theme"
          value={definedBy === "SYSTEM" ? "" : (theme ?? "")}
          onChange={(event) => {
            const nextTheme = event.target.value;
            if (nextTheme === "") {
              setTheme(null);
            } else {
              setTheme(nextTheme as Theme);
            }
          }}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="">System</option>
          <option value={Theme.LIGHT}>Light</option>
          <option value={Theme.DARK}>Dark</option>
        </select>
      </label>
    </div>
  );
}
