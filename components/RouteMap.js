import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native'; // Import Text here

const RouteMap = ({ routeCoordinates, busLocation }) => {
  if (!routeCoordinates || routeCoordinates.length === 0) {
    return (
      <View style={styles.mapContainer}>
        <Text>No route data available.</Text> {/* Wrap in Text component */}
      </View>
    );
  }

  const region = {
    latitude: routeCoordinates[0].latitude,
    longitude: routeCoordinates[0].longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.map} initialRegion={region}>
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#000"
          strokeWidth={2}
        />
        {busLocation && (
          <Marker
            coordinate={busLocation}
            title="Bus Location"
            description="Current bus position"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 300,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  map: {
    flex: 1,
  },
});

export default RouteMap;
