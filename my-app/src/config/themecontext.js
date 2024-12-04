import React, { createContext, useContext, useState } from 'react';
import { DefaultTheme, PaperProvider } from 'react-native-paper'; // Importa PaperProvider

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

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme: currentTheme }}>
      {/* Asegúrate de envolver a los hijos con PaperProvider para que el tema sea aplicado correctamente */}
      <PaperProvider theme={currentTheme}>
        {children}
      </PaperProvider>
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
