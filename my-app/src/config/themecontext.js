// src/context/ThemeContext.js

import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from '../config/tema';

// Crea un contexto para el tema
const ThemeContext = createContext();

// Proveedor del tema
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Cambia entre tema claro y oscuro
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Define colores globales para textos
  const textStyles = {
    primary: isDarkMode ? '#FFD700' : '#000', // Amarillo para oscuro, negro para claro
    secondary: isDarkMode ? '#FFF' : '#9F14C9', // Blanco para oscuro, gris para claro
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        theme: isDarkMode ? darkTheme : lightTheme,
        textStyles,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado
export const useTheme = () => useContext(ThemeContext);
