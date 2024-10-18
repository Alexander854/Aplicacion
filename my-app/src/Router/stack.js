import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { primaryColor } from "../config/colors";



import Home from "../screens/home";

import LoadingScreen from "../screens/LoadingScreen";
import Register from "../screens/register";
import Logout from "../screens/logout";
import Login from "../screens/login";
import InicioTabs from "../screens/inicio";
import tabs from './tabs';
import CrearReceta from "../screens/crearReceta";


export default StackScreens = () => {
    const Stack = createNativeStackNavigator();
    const opcionesDefault = {
        headerStyle: {
            backgroundColor: primaryColor,
        },
        headerTitleStyle: { color: "white", alignment: "center" },
        headerTitleAlign: "center",
        
    };

    return (

        <Stack.Navigator>
                
        <Stack.Screen
        name="registrate"
        component={Register}
        options={opcionesDefault}
        />
        <Stack.Screen
        name="Login"
        component={Login}
        options={opcionesDefault}
        />
        <Stack.Screen
        name="Tabs"
        component={tabs}
        options={opcionesDefault}
        />
        <Stack.Screen
        name="Logout"
        component={Logout}
        options={opcionesDefault}
        />
        <Stack.Screen
        name="Inicio"
        component={Home}
        options={opcionesDefault}
        />
        <Stack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={opcionesDefault}
        />   

        <Stack.Screen
        name="CrearReceta"
        component={CrearReceta}
        options={opcionesDefault}
        /> 
        <Stack.Screen name="InicioTabs" component={InicioTabs} />


    </Stack.Navigator>
    
    )
}
