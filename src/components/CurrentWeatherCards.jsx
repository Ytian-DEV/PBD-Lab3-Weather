import WeatherSymbol from "./WeatherSymbols";
import { formatDateTime } from "../lib/formatters";

export default function CurrentWeatherCard({ location, current }) {
  return (
    <article className="panel current-panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow-text">
            {location.city}, {location.country}
          </p>
          <h2>Current Weather</h2>
        </div>
        <WeatherSymbol
          label={current.condition}
          symbol={current.symbol}
          iconUrl={current.iconUrl}
        />
      </div>

      <div className="temperature-row">
        <div className="temperature-value">{current.temperature} C</div>
        <div className="temperature-range">
          <span>High {current.high} C</span>
          <span>Low {current.low} C</span>
        </div>
      </div>

      <p className="lead-copy">{current.summary}</p>

      <div className="meta-grid">
        <div>
          <span className="meta-label">Condition</span>
          <strong>{current.condition}</strong>
        </div>
        <div>
          <span className="meta-label">Last updated</span>
          <strong>{formatDateTime(location.updatedAt)}</strong>
        </div>
      </div>
    </article>
  );
}
