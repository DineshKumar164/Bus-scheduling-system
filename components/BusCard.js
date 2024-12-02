import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BusCard = ({ busNumber, routeName, startTime, endTime, dutyStatus }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>Bus: {busNumber}</Text>
      <Text style={styles.cardText}>Route: {routeName}</Text>
      <Text style={styles.cardText}>Start Time: {startTime}</Text>
      <Text style={styles.cardText}>End Time: {endTime}</Text>
      <Text style={styles.cardText}>Status: {dutyStatus}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default BusCard;
