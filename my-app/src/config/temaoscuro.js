import { DefaultTheme } from 'react-native-paper';


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

export default darkTheme; // Export the theme as default
