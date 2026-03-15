const THEME_KEY = "weather-dashboard-theme";
const WEATHER_CACHE_KEY = "weather-dashboard-cache";

export function readThemePreference() {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.localStorage.getItem(THEME_KEY) ?? "light";
}

export function writeThemePreference(theme) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(THEME_KEY, theme);
}

export function readWeatherCache() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(WEATHER_CACHE_KEY);

    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);

    if (!parsedValue?.savedAt || !parsedValue?.data) {
      return null;
    }

    return parsedValue;
  } catch {
    return null;
  }
}

export function writeWeatherCache(data) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    WEATHER_CACHE_KEY,
    JSON.stringify({
      savedAt: new Date().toISOString(),
      data,
    }),
  );
}
