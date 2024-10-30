// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/FirebaseConfig';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Check user session and theme preferences on mount
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('darkMode');
        if (storedTheme !== null) {
          setDarkModeEnabled(JSON.parse(storedTheme));
        }
      } catch (error) {
        console.error("Error checking user session: ", error);
      } finally {
        setLoading(false);
      }
    };

    // Firebase listener for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await AsyncStorage.setItem('user', JSON.stringify(currentUser));
        setUser(currentUser);
      } else {
        await AsyncStorage.removeItem('user');
        setUser(null);
      }
      setLoading(false);
    });

    checkUserSession();

    return unsubscribe; // Cleanup on unmount
  }, []);

  // Toggle Dark Mode Preference
  const toggleDarkMode = async () => {
    const newMode = !darkModeEnabled;
    setDarkModeEnabled(newMode);
    await AsyncStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  // User Login
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  // User Logout
  const logout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, darkModeEnabled, toggleDarkMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
