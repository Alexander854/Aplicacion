import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Valor inicial de la animación (transparente)
  const navigation = useNavigation();

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setTimeout(() => {
        if (token) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Tabs' }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      }, 2000);
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

    // Animación de desvanecimiento
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <ActivityIndicator size="large" color="red" />
        <Text style={styles.message}>Cargando...</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  message: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default LoadingScreen;
