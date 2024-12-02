import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';


const ProfileScreen = () => {
  const { userDetails, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    // Navigation handled in AppNavigator
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      {userDetails ? (
          <>
        <Text style={styles.username}>Username: {userDetails.username}</Text>
         {/* Display other user profile details here */}
            <Button title="Logout" onPress={handleLogout} />
            </>
        ) : (
          <Text>Loading profile information...</Text>
        )}

    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    username: {
      fontSize: 18,
      marginBottom: 10,
    },
  });


export default ProfileScreen;