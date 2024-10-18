import { BottomNavigation } from "react-native-paper";
import { useState } from "react";
import Home from "../screens/home";
import Recetas from "../screens/recetas";
import Configuracion from "../screens/configuracion";

import { primaryColor } from "../config/colors";

export default TabsScreens = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {
      key: "Home",
      title: "Inicio",
      focusedIcon: "home",
      unfocusedIcon: "home-circle",
    },
    {
      key: "recetas",
      title: "Recetas",
      focusedIcon: "chef-hat",
      unfocusedIcon: "chef-hat",
    },
    {
      key: "config",
      title: "Configuración",
      focusedIcon: "setting" ,
      unfocusedIcon: "setting-circle",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Home: Home,
    recetas: Recetas,
    config: Configuracion,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: primaryColor }}
      activeColor="red"
      inactiveColor="blue"
    />
  );
};
