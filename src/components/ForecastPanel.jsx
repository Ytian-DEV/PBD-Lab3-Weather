import WeatherSymbol from "./WeatherSymbols";
import { formatDayName } from "../lib/formatters";

export default function ForecastPanel({ forecast }) {
  return (
    <article className="panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow-text">Outlook</p>
          <h2>5-Day Forecast</h2>
        </div>
        <span className="muted-text">Next 5 days</span>
      </div>

      <div className="forecast-grid">
        {forecast.map((day) => (
          <article className="forecast-card" key={day.date}>
            <span className="muted-text forecast-day">{formatDayName(day.date)}</span>
            <WeatherSymbol
              label={day.condition}
              symbol={day.symbol}
              size="sm"
            />
            <strong>{day.high} C</strong>
            <p>{day.condition}</p>
            <span className="muted-text forecast-low">Low {day.low} C</span>
          </article>
        ))}
      </div>
    </article>
  );
}
