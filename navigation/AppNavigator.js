import React, { useContext, useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DutyScheduleScreen from '../screens/DutyScheduleScreen';
import RouteMonitoringScreen from '../screens/RouteMonitoringScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const doSomethingAsync = async () => {
      setIsNavigating(true);
      try {
        // Your async operation logic here (e.g., API calls or data fetching)
      } finally {
        setIsNavigating(false);
      }
    };
    doSomethingAsync();
  }, []);

  if (isLoading || isNavigating) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={userToken ? 'Dashboard' : 'Login'}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DutySchedule" component={DutyScheduleScreen} options={{ title: 'Duty Schedule' }} />
      <Stack.Screen name="RouteMonitoring" component={RouteMonitoringScreen} options={{ title: 'Route Monitoring' }} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ title: 'Feedback' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
