import React, { useState } from "react";
import { BottomNavigation, Appbar } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import Home from "../screens/home";
import Recetas from "../screens/recetas";
import Configuracion from "../screens/configuracion";
import { useTheme } from "../config/themecontext"; // Asegúrate de tener un archivo `themecontext.js` con `useTheme`.

export default function TabsScreens({ navigation }) {
  const [index, setIndex] = useState(1);
  const { isDarkMode, toggleTheme } = useTheme(); // Obtener estado y función para cambiar tema.

  const [routes] = useState([
    { key: "recetas", title: "Recetas", focusedIcon: "chef-hat", unfocusedIcon: "chef-hat" },
    { key: "Home", title: "Inicio", focusedIcon: "home", unfocusedIcon: "home-circle" },
    { key: "config", title: "Configuración", focusedIcon: "cog", unfocusedIcon: "cog" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    recetas: Recetas,
    Home: Home,
    config: Configuracion,
  });

  return (
    <View style={styles.container}>
      {/* Barra superior con botón de cambio de tema */}
      <Appbar.Header style={{ backgroundColor: isDarkMode ? "#333" : "#fff" }}>
        <Appbar.Content title="Cooking Recipes App" color={isDarkMode ? "#FFD700" : "#000"} />
        <Appbar.Action
          icon={isDarkMode ? "white-balance-sunny" : "moon-waning-crescent"}
          onPress={toggleTheme}
          color={isDarkMode ? "#FFD700" : "#000"}
        />
      </Appbar.Header>

      {/* Navegación de pestañas */}
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{
          backgroundColor: isDarkMode ? "#333" : "#fff", // Fondo según el modo
        }}
        activeColor={isDarkMode ? "#FFD700" : "red"} // Colores activos según el tema
        inactiveColor={isDarkMode ? "#888" : "blue"} // Colores inactivos según el tema
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
