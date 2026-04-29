# React Native Weather App

A mobile weather app built with Expo, React Native, and React Navigation. Users can search for a city and view current weather information including temperature, condition, humidity, wind speed, and feels-like temperature.

## Tech Stack

- Expo
- React Native
- React Navigation
- JavaScript

## Features

- City-based weather search
- Current temperature and condition summary
- Detailed weather screen
- Dark themed mobile UI
- Ready for weather API integration

## Getting Started

Install dependencies:

```bash
npm install
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

## Project Structure

```text
app/
  _layout.jsx    # Navigation stack
  index.jsx      # Weather search screen
  details.jsx    # Weather details screen
assets/
  images/        # App icons and splash assets
```

## API Setup

Add your weather API key in `app/index.jsx`, then replace the placeholder search logic with the API request for your provider.
