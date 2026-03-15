import WeatherSymbol from "./WeatherSymbol";
import { formatClockLabel } from "../lib/formatters";

export default function HourlyPanel({ hourly }) {
  return (
    <article className="panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow-text">Today</p>
          <h2>Hourly Outlook</h2>
        </div>
        <span className="muted-text">Upcoming intervals</span>
      </div>

      <div className="hourly-grid">
        {hourly.map((entry) => (
          <article className="hourly-card" key={entry.time}>
            <div className="hourly-card-top">
              <span className="muted-text hourly-time">{formatClockLabel(entry.time)}</span>
              <span className="hourly-rain">Rain {entry.precipitationChance}%</span>
            </div>

            <div className="hourly-card-main">
              <WeatherSymbol
                label={entry.condition}
                symbol={entry.symbol}
                size="sm"
              />
              <div className="hourly-card-copy">
                <strong>{entry.temperature} C</strong>
                <p>{entry.condition}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </article>
  );
}
