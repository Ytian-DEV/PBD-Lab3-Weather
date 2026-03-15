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
        <span className="muted-text">Hardcoded starter content</span>
      </div>

      <div className="hourly-grid">
        {hourly.map((entry) => (
          <article className="hourly-card" key={entry.time}>
            <span className="muted-text">{formatClockLabel(entry.time)}</span>
            <WeatherSymbol label={entry.condition} symbol={entry.symbol} />
            <strong>{entry.temperature} C</strong>
            <p>{entry.condition}</p>
            <span className="muted-text">Rain {entry.precipitationChance}%</span>
          </article>
        ))}
      </div>
    </article>
  );
}
