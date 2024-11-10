import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#ffffff',
    primary: '#333333',
    secondary: '#555555',
    error: '#f13a59',
  },
};

export const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#ffffff',
    primary: '#333333',
    background: '#000000', // Fondo negro
    secondary: '#555555',
    error: '#f13a59',
  },
};


export default theme; // Export the theme as default
