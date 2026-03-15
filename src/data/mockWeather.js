const now = "2026-03-16T08:00:00+08:00";

export const mockWeather = {
  location: {
    city: "Baguio City",
    country: "PH",
    updatedAt: now,
  },
  current: {
    temperature: 23,
    high: 26,
    low: 18,
    feelsLike: 24,
    humidity: 66,
    windSpeed: 8,
    pressure: 1012,
    visibility: 10,
    uvIndex: 3,
    sunrise: "2026-03-16T06:08:00+08:00",
    sunset: "2026-03-16T18:09:00+08:00",
    condition: "Clear sky",
    summary:
      "Cool highland weather with bright sunshine, low rain chance, and a comfortable breeze through the afternoon.",
    symbol: "clr",
  },
  hourly: [
    {
      time: "2026-03-16T09:00:00+08:00",
      temperature: 23,
      precipitationChance: 2,
      condition: "Clear",
      symbol: "clr",
    },
    {
      time: "2026-03-16T12:00:00+08:00",
      temperature: 25,
      precipitationChance: 4,
      condition: "Sunny",
      symbol: "sun",
    },
    {
      time: "2026-03-16T15:00:00+08:00",
      temperature: 24,
      precipitationChance: 12,
      condition: "Clouds",
      symbol: "cld",
    },
    {
      time: "2026-03-16T18:00:00+08:00",
      temperature: 21,
      precipitationChance: 24,
      condition: "Rain",
      symbol: "rnn",
    },
  ],
  forecast: [
    {
      date: "2026-03-17T12:00:00+08:00",
      high: 26,
      low: 18,
      condition: "Clear",
      symbol: "clr",
    },
    {
      date: "2026-03-18T12:00:00+08:00",
      high: 25,
      low: 19,
      condition: "Clouds",
      symbol: "cld",
    },
    {
      date: "2026-03-19T12:00:00+08:00",
      high: 24,
      low: 18,
      condition: "Rain",
      symbol: "rnn",
    },
    {
      date: "2026-03-20T12:00:00+08:00",
      high: 23,
      low: 17,
      condition: "Storm",
      symbol: "stm",
    },
    {
      date: "2026-03-21T12:00:00+08:00",
      high: 24,
      low: 18,
      condition: "Clouds",
      symbol: "cld",
    },
  ],
};
