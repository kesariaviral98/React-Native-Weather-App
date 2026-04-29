import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';

const Index = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);  // 👈 new

  // Load history when app starts
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem(config.storage.historyKey);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (err) {
      console.log('Error loading history:', err);
    }
  };

  const saveToHistory = async (cityName) => {
    try {
      // Remove duplicate if exists, add to front
      const updated = [
        cityName,
        ...history.filter(c => c.toLowerCase() !== cityName.toLowerCase())
      ].slice(0, config.defaults.maxHistoryItems); // keep only last 5

      setHistory(updated);
      await AsyncStorage.setItem(config.storage.historyKey, JSON.stringify(updated));
    } catch (err) {
      console.log('Error saving history:', err);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem(config.storage.historyKey);
      setHistory([]);
    } catch (err) {
      console.log('Error clearing history:', err);
    }
  };

  const handleSearch = async (searchCity = city) => {
    if (!searchCity.trim()) {
      setError('Please enter a city name');
      return;
    }

    setError('');
    setLoading(true);
    setWeather(null);

    try {
      const response = await fetch(
        `${config.api.baseUrl}/weather?q=${searchCity}&appid=${config.api.key}&units=${config.defaults.units}`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setError('City not found. Please try again.');
        return;
      }

      const weatherData = {
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        wind: data.wind.speed,
        city: data.name,
        country: data.sys.country,
        icon: data.weather[0].icon,
      };

      setWeather(weatherData);
      await saveToHistory(data.name); // save successful search

    } catch (_err) {
      setError('Something went wrong. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryPress = (cityName) => {
    setCity(cityName);
    handleSearch(cityName);
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🌤️ Weather App</Text>
        <Text style={styles.subtitle}>Find weather for any city</Text>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name..."
          placeholderTextColor="#888888"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSearch()}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Search History */}
      {history.length > 0 && !weather && !loading && (
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Recent Searches</Text>
            <TouchableOpacity onPress={clearHistory}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>

          {history.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.historyItem}
              onPress={() => handleHistoryPress(item)}
            >
              <Text style={styles.historyIcon}>🕐</Text>
              <Text style={styles.historyText}>{item}</Text>
              <Text style={styles.historyArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Error */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Loading */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#e94560"
          style={{ marginTop: 30 }}
        />
      )}

      {/* Weather Card */}
      {weather && !loading && (
        <View style={styles.weatherCard}>
          <Text style={styles.cityName}>
            {weather.city}, {weather.country}
          </Text>

          <Image
            source={{ uri: `${config.api.iconUrl}/${weather.icon}@2x.png` }}
            resizeMode="contain"
            style={styles.weatherIcon}
          />

          <Text style={styles.weatherTemp}>{weather.temp}°C</Text>
          <Text style={styles.weatherCondition}>{weather.condition}</Text>
          <Text style={styles.weatherDescription}>{weather.description}</Text>

          {/* Extra Details */}
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Feels like</Text>
              <Text style={styles.detailValue}>{weather.feels_like}°C</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Humidity</Text>
              <Text style={styles.detailValue}>{weather.humidity}%</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Wind</Text>
              <Text style={styles.detailValue}>{weather.wind} m/s</Text>
            </View>
          </View>

          {/* Buttons Row */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigation.navigate('Details', {
                city: weather.city,
                country: weather.country,
                temp: weather.temp,
                feels_like: weather.feels_like,
                humidity: weather.humidity,
                condition: weather.condition,
                description: weather.description,
                wind: weather.wind,
                icon: weather.icon,
              })}
            >
              <Text style={styles.detailsButtonText}>See Details →</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.newSearchButton}
              onPress={() => {
                setWeather(null);
                setCity('');
              }}
            >
              <Text style={styles.newSearchButtonText}>New Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

    </ScrollView>
  );
}

export default Index;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#aaaaaa',
    fontSize: 16,
    marginTop: 8,
  },
  searchSection: {
    gap: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    color: '#000000',
  },
  button: {
    backgroundColor: '#e94560',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  historySection: {
    marginTop: 24,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearText: {
    color: '#e94560',
    fontSize: 14,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
  },
  historyIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  historyText: {
    color: '#ffffff',
    fontSize: 16,
    flex: 1,
  },
  historyArrow: {
    color: '#aaaaaa',
    fontSize: 16,
  },
  error: {
    color: '#ff6b6b',
    textAlign: 'center',
    marginTop: 10,
  },
  weatherCard: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 30,
    gap: 8,
  },
  cityName: {
    color: '#aaaaaa',
    fontSize: 18,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherTemp: {
    color: '#ffffff',
    fontSize: 72,
    fontWeight: 'bold',
  },
  weatherCondition: {
    color: '#e94560',
    fontSize: 24,
    fontWeight: 'bold',
  },
  weatherDescription: {
    color: '#aaaaaa',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ffffff20',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    color: '#aaaaaa',
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  detailsButton: {
    borderWidth: 1,
    borderColor: '#e94560',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  detailsButtonText: {
    color: '#e94560',
    fontWeight: 'bold',
  },
  newSearchButton: {
    borderWidth: 1,
    borderColor: '#aaaaaa',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  newSearchButtonText: {
    color: '#aaaaaa',
    fontWeight: 'bold',
  },
});
