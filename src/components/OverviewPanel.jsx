import { formatClockLabel } from "../lib/formatters";

export default function OverviewPanel({ current }) {
  return (
    <article className="panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow-text">Day Cycle</p>
          <h2>Daily Overview</h2>
        </div>
      </div>

      <ul className="overview-list">
        <li>
          <span>Sunrise</span>
          <strong>{formatClockLabel(current.sunrise)}</strong>
        </li>
        <li>
          <span>Sunset</span>
          <strong>{formatClockLabel(current.sunset)}</strong>
        </li>
        <li>
          <span>High / Low</span>
          <strong>
            {current.high} C / {current.low} C
          </strong>
        </li>
        <li>
          <span>Prototype stage</span>
          <strong>Static data only</strong>
        </li>
      </ul>
    </article>
  );
}
