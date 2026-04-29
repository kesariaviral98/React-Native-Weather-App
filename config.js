const config = {
  api: {
    key: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
    baseUrl: process.env.EXPO_PUBLIC_WEATHER_BASE_URL,
  },
  app: {
    name: 'Weather App',
    version: '1.0.0',
  },
  defaults: {
    units: 'metric',
    language: 'en',
  },
};

export default config;