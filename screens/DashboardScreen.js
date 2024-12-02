import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Alert, View, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import BusCard from '../components/BusCard';
import Notification from '../components/Notification';
import { AuthContext } from '../context/AuthContext';
import { apiService } from '../services/apiService'; // Mock API

const DashboardScreen = ({ navigation }) => {
  const { logout, userDetails } = useContext(AuthContext);
  const [currentDuty, setCurrentDuty] = useState(null);
  const [upcomingDuties, setUpcomingDuties] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState({ duties: true, notifications: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, duties: true }));
        const duties = await apiService.getDuties();
        const currentUserDuties = duties.filter(d => d.busNumber.includes(userDetails?.username || ''));
        const current = currentUserDuties.find(d => d.linked); // Assuming one active duty at a time
        setCurrentDuty(current || null);

        const upcoming = currentUserDuties.filter(d => !d.linked);
        setUpcomingDuties(upcoming);
      } catch (error) {
        console.error("Error fetching duties:", error);
      } finally {
        setLoading(prev => ({ ...prev, duties: false }));
      }

      try {
        setLoading(prev => ({ ...prev, notifications: true }));
        const fetchedNotifications = await apiService.getNotifications();
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error("Error fetching notifications", error);
      } finally {
        setLoading(prev => ({ ...prev, notifications: false }));
      }
    };

    fetchData();
  }, [userDetails]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: () => {
            logout();  // Call the logout function
            navigation.navigate('Login');  // Navigate to the Login screen after logout
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Dashboard" />
      <ScrollView style={styles.content}>
        {userDetails && (<Text style={styles.welcomeText}>Welcome, {userDetails.username}!</Text>)}
        {loading.duties ? (
          <Text>Loading Duties...</Text>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Current Duty</Text>
            {currentDuty ? (
              <BusCard {...currentDuty} />
            ) : (
              <Text style={styles.noDataText}>No current duty assigned.</Text>
            )}

            <Text style={styles.sectionTitle}>Upcoming Duties</Text>
            {upcomingDuties.length > 0 ? (
              upcomingDuties.map((duty) => <BusCard key={duty.id} {...duty} />)
            ) : (
              <Text style={styles.noDataText}>No upcoming duties.</Text>
            )}
          </>
        )}
        <Text style={styles.sectionTitle}>Notifications</Text>
        {loading.notifications ? (
          <Text>Loading Notifications...</Text>
        ) : (
          notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <Notification key={index} message={notification.message} type={notification.type} />
            ))
          ) : (
            <Text style={styles.noDataText}>No new notifications.</Text>
          )
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DutySchedule')}
        >
          <Text style={styles.buttonText}>View Duty Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RouteMonitoring')}
        >
          <Text style={styles.buttonText}>Start Route Monitoring</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Background color
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  noDataText: {
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DashboardScreen;
