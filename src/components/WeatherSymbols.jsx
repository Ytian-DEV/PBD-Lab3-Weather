function chipClassName(symbol) {
  const map = {
    clr: "symbol-chip symbol-chip--clear",
    sun: "symbol-chip symbol-chip--sun",
    cld: "symbol-chip symbol-chip--cloud",
    rnn: "symbol-chip symbol-chip--rain",
    stm: "symbol-chip symbol-chip--storm",
  };

  return map[symbol] ?? "symbol-chip";
}

export default function WeatherSymbol({ label, symbol, iconUrl, lazy = false }) {
  if (iconUrl) {
    return (
      <img
        className="symbol-image"
        src={iconUrl}
        alt={`${label} icon`}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        fetchPriority={lazy ? "low" : "high"}
      />
    );
  }

  return <span className={chipClassName(symbol)}>{symbol ?? "n/a"}</span>;
}
