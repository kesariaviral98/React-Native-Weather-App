# React Native Weather App

A mobile weather app built with Expo and React Native. Search for a city, view current weather conditions, see detailed metrics, and quickly revisit recent searches.

## Tech Stack

- Expo
- React Native
- React Navigation Native Stack
- AsyncStorage
- JavaScript
- OpenWeatherMap API

## Features

- Search current weather by city name
- Display temperature, weather condition, description, humidity, wind speed, and feels-like temperature
- Show weather icons from the weather API
- Dedicated weather details screen
- Persist recent searches locally with AsyncStorage
- Clear recent search history
- Dark themed mobile UI

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_WEATHER_API_KEY=your_api_key_here
EXPO_PUBLIC_WEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
```

Start the development server:

```bash
npm start
```

Run on a platform:

```bash
npm run android
npm run ios
npm run web
```

## Scripts

```bash
npm start      # Start Expo
npm run android
npm run ios
npm run web
npm run lint
```

## Project Structure

```text
App.jsx         # Navigation container and stack screens
index.js        # Expo root registration
config.js       # API, storage, and app configuration
app/
  index.jsx     # Search screen and recent search history
  details.jsx   # Weather details screen
assets/
  images/       # App icon, splash, Android icon, and favicon assets
```

## Configuration

The app reads API settings from `config.js`, using Expo public environment variables:

- `EXPO_PUBLIC_WEATHER_API_KEY`
- `EXPO_PUBLIC_WEATHER_BASE_URL`

Recent searches are stored locally using AsyncStorage under the key defined in `config.storage.historyKey`.
