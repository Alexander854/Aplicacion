import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Boton from "../components/Boton";

export default function Logout({ navigation }) {
    const handleLogin = () => {
        // Aquí puedes agregar la lógica para desloguear al usuario
        console.log("Usuario deslogueado");
    };

    return (
    
            <View style={styles.container}>
                <Text style={styles.titulo}>Bienvenido</Text>
                <Boton texto="deslogeate" onPress={handleLogin} />
                <StatusBar style="auto" />
            </View>

    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        justifyContent: 'center'
    },
    subtitulo: {
        fontSize: 20,
        color: 'lightblue',
        justifyContent: 'center'
    },
    textInput: {
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        paddingStart: 40,
        width: '80%',
        height: 50,
        marginTop: 10,
        borderRadius: 30,
        backgroundColor: '#fff'
    },
    forgotpassword: {
        fontSize: 20,
        color: 'gray',
        marginTop: 10
    },
    register: {
        fontSize: 20,
        color: 'gray',
        marginTop: 10
    }
});
