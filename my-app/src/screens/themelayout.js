import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Layout = ({ children, isDarkMode }) => {
  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#333', // Fondo oscuro
  },
});
