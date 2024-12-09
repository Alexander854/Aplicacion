import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { useTheme } from '../config/themecontext'; // Importar el hook de uso del tema
import { primaryColor } from "../config/colors";

import Home from "../screens/home";
import Profile from '../screens/profile';
import CrearReceta from "../screens/crearReceta";
import LoadingScreen from "../screens/LoadingScreen";
import Register from "../screens/register";
import Logout from "../screens/logout";
import Login from "../screens/login";
import InicioTabs from "../screens/inicio";
import tabs from './tabs';
import Configuracion from '../screens/configuracion';
import RecipeDetail from '../screens/recipedetail';

const Stack = createNativeStackNavigator();

export default function StackScreens() {
    const { theme } = useTheme(); // Obtener el tema actual de ThemeProvider

    const opcionesDefault = {
        headerStyle: {
            backgroundColor: primaryColor,
        },
        headerTitleStyle: { color: "white", alignment: "center" },
        headerTitleAlign: "center",
        headerShown: false ,
    };

    return (
        <PaperProvider theme={theme}> 
            <Stack.Navigator screenOptions={opcionesDefault}>
                <Stack.Screen
                    name="registrate"
                    component={Register}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="Tabs"
                    component={tabs}
                />
                <Stack.Screen
                    name="Logout"
                    component={Logout}
                />
                <Stack.Screen
                    name="Inicio"
                    component={Home}
                />
                <Stack.Screen
                    name="LoadingScreen"
                    component={LoadingScreen}
                />   
                <Stack.Screen
                    name="CrearReceta"
                    component={CrearReceta}
                /> 
                <Stack.Screen
                    name="Perfil"
                    component={Profile}
                /> 
                <Stack.Screen
                    name="Configuracion"
                    component={Configuracion}
                /> 
                <Stack.Screen
                    name="RecipeDetail"
                    component={RecipeDetail}
                />
                <Stack.Screen
                    name="InicioTabs"
                    component={InicioTabs}
                />
            </Stack.Navigator>
        </PaperProvider>
    );
}
