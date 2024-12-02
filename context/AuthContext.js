import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { apiService } from '../services/apiService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          const username = await SecureStore.getItemAsync('username');
          setUserToken(token);
          setUserDetails({ username });
        }
      } catch (error) {
        console.error("SecureStore Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await apiService.login(username, password);
      if (response.success && response.token) {
        await SecureStore.setItemAsync('userToken', response.token);
        await SecureStore.setItemAsync('username', username);
        setUserToken(response.token);
        setUserDetails({ username });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login Error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('username');
      setUserToken(null);
      setUserDetails(null);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoading, userToken, userDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
