import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = ({ message = 'Cargando, por favor espera...' }) => {
  const navigation = useNavigation();

  // Function to check token and navigate
  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken'); // Adjust key if needed
      if (token) {
        // If token exists, navigate to the main screen (e.g., 'Tabs')
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs' }],
        });
      } else {
        // If no token, navigate to the Login screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    } catch (error) {
      console.error('Error checking token:', error);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4CAF50" />
      <Text style={styles.message}>{message}</Text>
      <View style={styles.spinnerContainer}>
        <Text style={styles.loadingText}>Estamos preparándolo todo para ti...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    padding: 20,
  },
  message: {
    marginTop: 15,
    fontSize: 20,
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  spinnerContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LoadingScreen;
