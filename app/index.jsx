import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useState } from "react";
import config from "../config";

const Index = ({ navigation }) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setError("");
    setLoading(true);
    setWeather(null);

    try {
      const response = await fetch(
        `${config.api.baseUrl}/weather?q=${city}&appid=${config.api.key}&units=${config.defaults.units}`,
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setError("City not found. Please try again.");
        return;
      }

      setWeather({
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        wind: data.wind.speed,
        city: data.name,
        country: data.sys.country,
        icon: data.weather[0].icon,
      });
    } catch (_err) {
      setError("Something went wrong. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

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

          {/* See Details Button */}
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() =>
              navigation.navigate("Details", {
                city: weather.city,
                country: weather.country,
                temp: weather.temp,
                feels_like: weather.feels_like,
                humidity: weather.humidity,
                condition: weather.condition,
                description: weather.description,
                wind: weather.wind,
                icon: weather.icon,
              })
            }
          >
            <Text style={styles.detailsButtonText}>See Details →</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    padding: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#aaaaaa",
    fontSize: 16,
    marginTop: 8,
  },
  searchSection: {
    gap: 12,
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    color: "#000000",
  },
  button: {
    backgroundColor: "#e94560",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "#ff6b6b",
    textAlign: "center",
    marginTop: 10,
  },
  weatherCard: {
    backgroundColor: "#16213e",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginTop: 30,
    gap: 8,
  },
  cityName: {
    color: "#aaaaaa",
    fontSize: 18,
  },
  weatherTemp: {
    color: "#ffffff",
    fontSize: 72,
    fontWeight: "bold",
  },
  weatherCondition: {
    color: "#e94560",
    fontSize: 24,
    fontWeight: "bold",
  },
  weatherDescription: {
    color: "#aaaaaa",
    fontSize: 16,
    textTransform: "capitalize",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ffffff20",
  },
  detailItem: {
    alignItems: "center",
    flex: 1,
  },
  detailLabel: {
    color: "#aaaaaa",
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  detailsButton: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#e94560",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  detailsButtonText: {
    color: "#e94560",
    fontWeight: "bold",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
});
