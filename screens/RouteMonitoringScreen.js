import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import RouteMap from '../components/RouteMap';
import { apiService } from '../services/apiService';

const RouteMonitoringScreen = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [busLocation, setBusLocation] = useState(null);

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const routeData = await apiService.getRouteData(); // Replace with your API call
        setRouteCoordinates(routeData.coordinates);
        setBusLocation(routeData.currentLocation); // Update the bus location periodically (e.g., using setInterval)
      } catch (error) {
        console.error("Error fetching route data:", error);
        // Handle the error, e.g., display an error message
      }
    };

    fetchRouteData();

    // Simulate bus movement (replace with real-time updates from your API)
    const intervalId = setInterval(() => {
      // Update busLocation with new coordinates
      // ... your logic to get new coordinates ...
    }, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);

  return (
    <View style={styles.container}>
      {/* <Header title="Route Monitoring" /> */}
      {routeCoordinates.length === 0 ? (
        <Text>No route data available.</Text>
      ) : (
        <RouteMap routeCoordinates={routeCoordinates} busLocation={busLocation} />
      )}
      {/* Add other UI elements as needed (e.g., route information, ETA) */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RouteMonitoringScreen;
