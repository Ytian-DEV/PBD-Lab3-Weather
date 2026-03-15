import {
  FiCloud,
  FiCloudDrizzle,
  FiCloudLightning,
  FiCloudRain,
  FiCloudSnow,
  FiSun,
} from "react-icons/fi";

const symbolMap = {
  clr: { icon: FiSun, tone: "clear" },
  sun: { icon: FiSun, tone: "sun" },
  cld: { icon: FiCloud, tone: "cloud" },
  rnn: { icon: FiCloudRain, tone: "rain" },
  drz: { icon: FiCloudDrizzle, tone: "mist" },
  snw: { icon: FiCloudSnow, tone: "mist" },
  stm: { icon: FiCloudLightning, tone: "storm" },
};

function resolveSymbol(symbol, label) {
  const normalizedLabel = (label ?? "").toLowerCase();

  if (symbolMap[symbol]) {
    return symbolMap[symbol];
  }

  if (normalizedLabel.includes("thunder") || normalizedLabel.includes("storm")) {
    return symbolMap.stm;
  }

  if (normalizedLabel.includes("rain")) {
    return symbolMap.rnn;
  }

  if (normalizedLabel.includes("drizzle") || normalizedLabel.includes("mist")) {
    return symbolMap.drz;
  }

  if (normalizedLabel.includes("snow")) {
    return symbolMap.snw;
  }

  if (normalizedLabel.includes("sun") || normalizedLabel.includes("clear")) {
    return symbolMap.clr;
  }

  return symbolMap.cld;
}

export default function WeatherSymbol({ label, symbol, size = "md" }) {
  const { icon: Icon, tone } = resolveSymbol(symbol, label);

  return (
    <span
      className={`weather-icon weather-icon--${tone} weather-icon--${size}`}
      role="img"
      aria-label={label}
      title={label}
    >
      <Icon aria-hidden="true" />
    </span>
  );
}
