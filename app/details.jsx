import { View, Text, StyleSheet } from 'react-native';

const Details = ({ route }) => {
  const { city, country, temp, feels_like, humidity, condition, description, wind } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{city}, {country}</Text>
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
    </View>
  );
}

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 24,
    alignItems: 'center',
    paddingTop: 40,
  },
  city: {
    color: '#aaaaaa',
    fontSize: 20,
    marginBottom: 8,
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