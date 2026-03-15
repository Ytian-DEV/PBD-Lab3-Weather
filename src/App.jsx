import { useEffect, useRef, useState } from "react";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastPanel from "./components/ForecastPanel";
import HighlightsGrid from "./components/HighlightsGrid";
import HourlyPanel from "./components/HourlyPanel";
import OverviewPanel from "./components/OverviewPanel";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import { mockWeather } from "./data/mockWeather";
import { formatDateTime } from "./lib/formatters";
import {
  readThemePreference,
  readWeatherCache,
  writeThemePreference,
  writeWeatherCache,
} from "./lib/storage";
import { fetchWeatherBundle } from "./lib/weatherApi";

const DEFAULT_CITY = "Baguio City";

function getInitialDashboardState(apiKey, cachedWeather) {
  if (cachedWeather?.data) {
    return {
      city: cachedWeather.data.location.city,
      weatherData: cachedWeather.data,
      notice: apiKey
        ? `Loaded cached weather from ${formatDateTime(cachedWeather.savedAt)} while refreshing live data.`
        : `Showing cached weather from ${formatDateTime(cachedWeather.savedAt)}. Add an API key to refresh live data.`,
      sourceLabel: "Cached weather data",
    };
  }

  return {
    city: DEFAULT_CITY,
    weatherData: mockWeather,
    notice: apiKey
      ? "Loading live weather data for the default city."
      : "Missing API key. The dashboard is showing starter data until VITE_OPENWEATHER_API_KEY is configured.",
    sourceLabel: "Starter mock data",
  };
}

export default function App() {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const cachedWeatherRef = useRef(readWeatherCache());
  const initialState = useRef(
    getInitialDashboardState(apiKey, cachedWeatherRef.current),
  ).current;
  const hasLoadedDefault = useRef(false);
  const [theme, setTheme] = useState(() => readThemePreference());
  const [city, setCity] = useState(initialState.city);
  const [weatherData, setWeatherData] = useState(initialState.weatherData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(initialState.notice);
  const [sourceLabel, setSourceLabel] = useState(initialState.sourceLabel);

  async function handleSearch(nextCity = city) {
    const trimmedCity = nextCity.trim();

    if (!trimmedCity) {
      setError("Please enter a city name before searching.");
      return;
    }

    if (!apiKey) {
      setError("Add VITE_OPENWEATHER_API_KEY to .env.local to enable live city search.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await fetchWeatherBundle(trimmedCity, apiKey);
      setWeatherData(result);
      setCity(result.location.city);
      setSourceLabel("Live API data");
      setNotice("");
      writeWeatherCache(result);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Unexpected error while loading weather data.";

      setError(message);
      setNotice("Showing the most recent dashboard data currently available.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writeThemePreference(theme);
  }, [theme]);

  useEffect(() => {
    if (!apiKey || hasLoadedDefault.current) {
      return;
    }

    hasLoadedDefault.current = true;
    handleSearch(initialState.city);
  }, [apiKey, initialState.city]);

  const searchHelperText = apiKey
    ? "Search any city supported by OpenWeather to refresh the dashboard."
    : "Create a .env.local file from .env.example, then add your OpenWeather API key.";

  return (
    <div className="app-shell">
      <div className="background-scene" aria-hidden="true">
        <span className="scene-blob scene-blob--sun" />
        <span className="scene-blob scene-blob--sky" />
        <span className="scene-blob scene-blob--mist" />
        <span className="scene-blob scene-blob--aurora" />
        <span className="scene-beam scene-beam--left" />
        <span className="scene-beam scene-beam--right" />
        <span className="scene-grid" />
      </div>

      <div className="app-content">
        <header className="hero-grid">
          <section className="hero-copy">
            <div className="hero-topline">
              <div className="section-tag">Live Weather Dashboard</div>
              <ThemeToggle
                theme={theme}
                onToggle={() =>
                  setTheme((currentTheme) =>
                    currentTheme === "light" ? "dark" : "light",
                  )
                }
              />
            </div>
            <h1>Responsive Weather Dashboard</h1>
            <p>
              Search a city to load current conditions, an hourly outlook, and a
              5-day forecast from the OpenWeather API. The layout stays responsive
              across mobile, tablet, and desktop screens.
            </p>
          </section>

          <SearchBar
            value={city}
            onChange={setCity}
            onSearch={() => handleSearch(city)}
            disabled={loading || !apiKey}
            buttonLabel={loading ? "Loading weather..." : "Search city"}
            helperText={searchHelperText}
          />
        </header>

        {error ? (
          <div className="status-banner status-banner--error">{error}</div>
        ) : null}
        {notice ? (
          <div className="status-banner status-banner--info">{notice}</div>
        ) : null}

        <main className="dashboard-grid">
          <div className="dashboard-stack">
            <CurrentWeatherCard
              location={weatherData.location}
              current={weatherData.current}
            />
            <HourlyPanel hourly={weatherData.hourly} />
            <ForecastPanel forecast={weatherData.forecast} />
          </div>

          <div className="dashboard-stack dashboard-stack--aside">
            <HighlightsGrid current={weatherData.current} />
            <OverviewPanel current={weatherData.current} sourceLabel={sourceLabel} />
          </div>
        </main>
      </div>
    </div>
  );
}
