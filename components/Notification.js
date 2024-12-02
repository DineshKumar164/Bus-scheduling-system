import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Notification = ({ message, type }) => {
  const notificationStyle = type === 'warning' ? styles.warning : styles.info;

  return (
    <View style={[styles.notification, notificationStyle]}>
      <Text style={styles.notificationText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notification: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  info: {
    backgroundColor: '#e0f2f7',
    borderColor: '#81d4fa',
    borderWidth: 1,
  },
  warning: {
    backgroundColor: '#fff8e1',
    borderColor: '#ffeb3b',
    borderWidth: 1,
  },
  notificationText: {
    fontSize: 14,
  },
});

export default Notification;
