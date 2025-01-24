import { useEffect, useMemo, useState } from "react";

const ThemeProps = {
  key: "theme",
  light: "light",
  dark: "dark",
} as const;

type Theme = typeof ThemeProps.light | typeof ThemeProps.dark;

export const useTheme = (defaultTheme?: Theme) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(ThemeProps.key) as Theme | null;

    return storedTheme || (defaultTheme ?? ThemeProps.light);
  });

  const isDark = useMemo(() => theme === ThemeProps.dark, [theme]);
  const isLight = useMemo(() => theme === ThemeProps.light, [theme]);

  const _setTheme = (theme: Theme) => {
    localStorage.setItem(ThemeProps.key, theme);
    document.documentElement.classList.remove(ThemeProps.light, ThemeProps.dark);
    document.documentElement.classList.add(theme);
    setTheme(theme);
  };

  const setLightTheme = () => _setTheme(ThemeProps.light);
  const setDarkTheme = () => _setTheme(ThemeProps.dark);
  const toggleTheme = () => theme === ThemeProps.dark ? setLightTheme() : setDarkTheme();

  // The effect will only run when the theme changes
  useEffect(() => {
    _setTheme(theme);
  }, [theme]); // Run this effect only when `theme` changes

  return { theme, isDark, isLight, setLightTheme, setDarkTheme, toggleTheme };
};
