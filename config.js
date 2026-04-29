const config = {
  api: {
    key: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
    baseUrl: process.env.EXPO_PUBLIC_WEATHER_BASE_URL,
    iconUrl: 'https://openweathermap.org/img/wn',
  },
  app: {
    name: 'Weather App',
    version: '1.0.0',
  },
  defaults: {
    units: 'metric',
    language: 'en',
    maxHistoryItems: 5,
  },
  storage: {
    historyKey: 'search_history',
  },
};

export default config;
