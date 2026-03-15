import { useState } from "react";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastPanel from "./components/ForecastPanel";
import HighlightsGrid from "./components/HighlightsGrid";
import HourlyPanel from "./components/HourlyPanel";
import OverviewPanel from "./components/OverviewPanel";
import SearchBar from "./components/SearchBar";
import { mockWeather } from "./data/mockWeather";

export default function App() {
  const [city, setCity] = useState(mockWeather.location.city);

  return (
    <div className="app-shell">
      <header className="hero-grid">
        <section className="hero-copy">
          <div className="section-tag">React + Vite Foundation</div>
          <h1>Responsive Weather Dashboard</h1>
          <p>
            This first feature branch converts the lab into a component-based
            React application while keeping mock weather data in place. The next
            branch adds live API search, loading states, and error handling.
          </p>
        </section>

        <SearchBar
          value={city}
          onChange={setCity}
          onSearch={() => {}}
          disabled
          helperText="Search is intentionally disabled until live API integration is added."
        />
      </header>

      <main className="dashboard-grid">
        <div className="dashboard-stack">
          <CurrentWeatherCard
            location={mockWeather.location}
            current={mockWeather.current}
          />
          <HourlyPanel hourly={mockWeather.hourly} />
          <ForecastPanel forecast={mockWeather.forecast} />
        </div>

        <div className="dashboard-stack dashboard-stack--aside">
          <HighlightsGrid current={mockWeather.current} />
          <OverviewPanel current={mockWeather.current} />
        </div>
      </main>
    </div>
  );
}
