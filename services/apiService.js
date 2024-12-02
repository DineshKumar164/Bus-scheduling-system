import AsyncStorage from '@react-native-async-storage/async-storage';


// Mock API functions (replace with your actual API calls)
const apiService = {
  login: async (username, password) => {
    await new Promise(r => setTimeout(r, 500)); // Simulate API delay
    if (username === 'testuser' && password === 'password') { // Example credentials
      return { success: true, token: 'mock_token' };
    } else {
      return { success: false };
    }
  },

  getDuties: async () => {
    await new Promise(r => setTimeout(r, 500));
    return [
      // ... your mock duty data ...
      { id: 1, busNumber: 'testuser123', routeName: 'Route A', startTime: '08:00', endTime: '12:00', dutyStatus: 'Linked', linked: true },
      { id: 2, busNumber: 'BUS456', routeName: 'Route B', startTime: '13:00', endTime: '17:00', dutyStatus: 'Unlinked', linked: false },
      // ... more duties
    ];
  },

  updateDutyStatus: async (dutyId, linked) => {
    await new Promise(r => setTimeout(r, 500));
    // Simulate updating duty status in your mock data.
    return { success: true };
  },

  getRouteData: async () => {
    await new Promise(r => setTimeout(r, 500));
    return {
      coordinates: [
        // ... your mock route coordinates (latitude, longitude)
        { latitude: 37.78825, longitude: -122.4324 },
        { latitude: 37.7749, longitude: -122.4194 },

        // ... more coordinates ...
      ],
      currentLocation: { latitude: 37.78825, longitude: -122.4324 }, // Initial bus location
    };
  },


  getNotifications: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [
          { message: 'Duty BUS456 has been updated', type: 'info' },
          { message: 'Route A is experiencing delays', type: 'warning' },
      ];
  },

  submitFeedback: async (feedbackData) => {
    await new Promise(r => setTimeout(r, 500));
    console.log("Submitted feedback:", feedbackData); // Log the feedback for now
    return { success: true }; // Simulate successful submission
  },

};


export { apiService };