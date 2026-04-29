import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import config from '../config';

const Details = ({ route }) => {
  const { city, country, temp, feels_like, humidity, condition, description, wind, icon } = route.params;

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.city}>{city}, {country}</Text>

      <Image
        source={{ uri: `${config.api.iconUrl}/${icon}@4x.png` }}
        resizeMode="contain"
        style={styles.weatherIcon}
      />

      <Text style={styles.temp}>{temp}°C</Text>
      <Text style={styles.condition}>{condition}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Feels Like</Text>
          <Text style={styles.value}>{feels_like}°C</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Humidity</Text>
          <Text style={styles.value}>{humidity}%</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Wind Speed</Text>
          <Text style={styles.value}>{wind} m/s</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default Details;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    paddingTop: 40,
  },
  city: {
    color: '#aaaaaa',
    fontSize: 20,
    marginBottom: 8,
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
  temp: {
    color: '#ffffff',
    fontSize: 80,
    fontWeight: 'bold',
  },
  condition: {
    color: '#e94560',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: '#aaaaaa',
    fontSize: 16,
    textTransform: 'capitalize',
    marginBottom: 40,
  },
  detailsCard: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff15',
    paddingBottom: 16,
  },
  label: {
    color: '#aaaaaa',
    fontSize: 16,
  },
  value: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});