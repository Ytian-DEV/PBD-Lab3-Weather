import { useEffect, useRef, useState } from "react";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastPanel from "./components/ForecastPanel";
import HighlightsGrid from "./components/HighlightsGrid";
import HourlyPanel from "./components/HourlyPanel";
import OverviewPanel from "./components/OverviewPanel";
import SearchBar from "./components/SearchBar";
import { mockWeather } from "./data/mockWeather";
import { fetchWeatherBundle } from "./lib/weatherApi";

const DEFAULT_CITY = "Baguio City";

export default function App() {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const hasLoadedDefault = useRef(false);
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState(mockWeather);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(
    apiKey
      ? ""
      : "Missing API key. The dashboard is showing starter data until VITE_OPENWEATHER_API_KEY is configured.",
  );
  const [sourceLabel, setSourceLabel] = useState(
    apiKey ? "Live API data" : "Starter mock data",
  );

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
    setNotice("");

    try {
      const result = await fetchWeatherBundle(trimmedCity, apiKey);
      setWeatherData(result);
      setCity(result.location.city);
      setSourceLabel("Live API data");
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
    if (!apiKey || hasLoadedDefault.current) {
      return;
    }

    hasLoadedDefault.current = true;
    handleSearch(DEFAULT_CITY);
  }, [apiKey]);

  const searchHelperText = apiKey
    ? "Search any city supported by OpenWeather to refresh the dashboard."
    : "Create a .env.local file from .env.example, then add your OpenWeather API key.";

  return (
    <div className="app-shell">
      <header className="hero-grid">
        <section className="hero-copy">
          <div className="section-tag">Live Weather Dashboard</div>
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

      {error ? <div className="status-banner status-banner--error">{error}</div> : null}
      {notice ? <div className="status-banner status-banner--info">{notice}</div> : null}

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
  );
}
