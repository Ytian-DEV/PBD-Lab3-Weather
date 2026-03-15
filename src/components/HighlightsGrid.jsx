const metrics = [
  ["Feels Like", "feelsLike", "C"],
  ["Humidity", "humidity", "%"],
  ["Wind Speed", "windSpeed", "km/h"],
  ["Pressure", "pressure", "hPa"],
  ["Visibility", "visibility", "km"],
  ["UV Index", "uvIndex", ""],
];

export default function HighlightsGrid({ current }) {
  return (
    <article className="panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow-text">Metrics</p>
          <h2>Weather Highlights</h2>
        </div>
      </div>

      <div className="highlights-grid">
        {metrics.map(([label, key, unit]) => (
          <article className="highlight-card" key={label}>
            <span className="muted-text">{label}</span>
            <strong>
              {current[key]}
              {unit ? ` ${unit}` : ""}
            </strong>
          </article>
        ))}
      </div>
    </article>
  );
}
