import React, { createContext, useContext, useState } from 'react';
import { DefaultTheme } from 'react-native-paper';

const ThemeContext = createContext();

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#6200ee',
    background: '#ffffff', // Fondo blanco
    secondary: '#555555',
    error: '#f13a59',
  },
};

const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#ffffff',
    primary: '#333333',
    background: '#121212', // Fondo oscuro
    secondary: '#555555',
    error: '#f13a59',
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para el modo oscuro

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode); // Alterna entre los modos
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme: isDarkMode ? darkTheme : lightTheme }}>
      {children} {/* Asegúrate de envolver a los hijos */}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
