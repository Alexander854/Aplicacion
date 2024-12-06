// src/context/ThemeContext.js

import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from '../config/tema';

// Crea un contexto para el tema
const ThemeContext = createContext();

// Crea un proveedor de tema
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para el tema (oscuro o claro)

  // Cambiar entre tema claro y oscuro
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme: isDarkMode ? darkTheme : lightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Crear un hook personalizado para acceder al contexto
export const useTheme = () => useContext(ThemeContext);
