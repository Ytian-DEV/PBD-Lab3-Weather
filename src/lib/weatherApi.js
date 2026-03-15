const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

function roundMetric(value) {
  return Math.round(value ?? 0);
}

function toKilometersPerHour(value) {
  return Math.round((value ?? 0) * 3.6);
}

function toTitleCase(value) {
  return (value ?? "")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function mapSymbol(main) {
  switch (main) {
    case "Clear":
      return "clr";
    case "Clouds":
      return "cld";
    case "Rain":
    case "Drizzle":
      return "rnn";
    case "Thunderstorm":
      return "stm";
    default:
      return "cld";
  }
}

function buildIconUrl(iconCode) {
  if (!iconCode) {
    return undefined;
  }

  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function buildSummary(currentData) {
  const description = currentData.weather?.[0]?.description ?? "stable weather";
  const windSpeed = toKilometersPerHour(currentData.wind?.speed);

  return `Live conditions show ${description} with winds near ${windSpeed} km/h.`;
}

function groupForecastByDay(list) {
  const buckets = new Map();

  list.forEach((entry) => {
    const dateKey = entry.dt_txt.split(" ")[0];
    const group = buckets.get(dateKey) ?? [];
    group.push(entry);
    buckets.set(dateKey, group);
  });

  return Array.from(buckets.entries()).map(([dateKey, entries]) => {
    const anchor = entries.reduce((best, entry) => {
      const bestHour = Number(best.dt_txt.split(" ")[1].slice(0, 2));
      const entryHour = Number(entry.dt_txt.split(" ")[1].slice(0, 2));

      return Math.abs(entryHour - 12) < Math.abs(bestHour - 12) ? entry : best;
    }, entries[0]);

    return {
      date: `${dateKey}T12:00:00`,
      high: roundMetric(Math.max(...entries.map((entry) => entry.main.temp_max))),
      low: roundMetric(Math.min(...entries.map((entry) => entry.main.temp_min))),
      condition: toTitleCase(anchor.weather?.[0]?.description ?? "Unavailable"),
      symbol: mapSymbol(anchor.weather?.[0]?.main),
      iconUrl: buildIconUrl(anchor.weather?.[0]?.icon),
    };
  });
}

async function getJson(response) {
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found. Check the spelling and try again.");
    }

    if (response.status === 401) {
      throw new Error("Invalid API key. Verify your OpenWeather account or wait for key activation.");
    }

    throw new Error(toTitleCase(data.message ?? "Unable to load weather data."));
  }

  return data;
}

function buildWeatherUrl(path, city, apiKey) {
  const params = new URLSearchParams({
    q: city,
    appid: apiKey,
    units: "metric",
  });

  return `${WEATHER_BASE_URL}/${path}?${params.toString()}`;
}

function transformWeatherData(currentData, forecastData) {
  return {
    location: {
      city: currentData.name,
      country: currentData.sys.country,
      updatedAt: new Date(currentData.dt * 1000).toISOString(),
    },
    current: {
      temperature: roundMetric(currentData.main.temp),
      high: roundMetric(currentData.main.temp_max),
      low: roundMetric(currentData.main.temp_min),
      feelsLike: roundMetric(currentData.main.feels_like),
      humidity: roundMetric(currentData.main.humidity),
      windSpeed: toKilometersPerHour(currentData.wind.speed),
      pressure: roundMetric(currentData.main.pressure),
      visibility: roundMetric((currentData.visibility ?? 0) / 1000),
      cloudCover: roundMetric(currentData.clouds?.all),
      sunrise: new Date(currentData.sys.sunrise * 1000).toISOString(),
      sunset: new Date(currentData.sys.sunset * 1000).toISOString(),
      condition: toTitleCase(currentData.weather?.[0]?.description ?? "Unavailable"),
      summary: buildSummary(currentData),
      symbol: mapSymbol(currentData.weather?.[0]?.main),
      iconUrl: buildIconUrl(currentData.weather?.[0]?.icon),
    },
    hourly: forecastData.list.slice(0, 4).map((entry) => ({
      time: new Date(entry.dt * 1000).toISOString(),
      temperature: roundMetric(entry.main.temp),
      precipitationChance: roundMetric((entry.pop ?? 0) * 100),
      condition: toTitleCase(entry.weather?.[0]?.description ?? "Unavailable"),
      symbol: mapSymbol(entry.weather?.[0]?.main),
      iconUrl: buildIconUrl(entry.weather?.[0]?.icon),
    })),
    forecast: groupForecastByDay(forecastData.list).slice(0, 5),
  };
}

export async function fetchWeatherBundle(city, apiKey) {
  if (!apiKey) {
    throw new Error("Add VITE_OPENWEATHER_API_KEY to .env.local to enable live search.");
  }

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(buildWeatherUrl("weather", city, apiKey)),
      fetch(buildWeatherUrl("forecast", city, apiKey)),
    ]);

    const [currentData, forecastData] = await Promise.all([
      getJson(currentResponse),
      getJson(forecastResponse),
    ]);

    return transformWeatherData(currentData, forecastData);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Network error. Check your internet connection and try again.");
    }

    throw error;
  }
}
