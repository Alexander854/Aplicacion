import React, { useState } from "react";
import { StatusBar, Alert, StyleSheet, Text, View, TextInput, ImageBackground } from 'react-native';
import Boton from "../components/Boton";
import { login } from '../config/api'; // Importa la URL de login desde tu archivo de configuración

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Function for login
    const handleLogin = async () => {
        try {
            const response = await fetch(login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password }), // Asegúrate de que los nombres de los campos coincidan con los esperados por tu backend
            });
            const Data = await response.json();
            if (Data.success) {
                await saveToken(Data.token);
                navigation.navigate("Tabs"); // Navigate to your Tabs screen
            } else {
                Alert.alert("Error", "El inicio de sesión ha fallado. Por favor, intenta de nuevo.");
            }
        } catch (error) {
            console.error("Login error: ", error);
            Alert.alert("Error", "Ocurrió un problema al iniciar sesión.");
        }
    };

    // Function to save the token
    const saveToken = async (token) => {
        try {
            await save('token', token);
        } catch (error) {
            console.error("Error saving token: ", error);
        }
    };

    return (
        <ImageBackground
            source={require("../../assets/login.jpg")}
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.titulo}>Bienvenido</Text>
                <Text style={styles.subtitulo}>inicia con tu cuenta</Text>

                <TextInput
                    placeholder="nombre usuario"
                    style={styles.textInput}
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    placeholder="contraseña"
                    style={styles.textInput}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true} // To hide password text
                />

                <Text style={styles.register}>registrarse</Text>
                <Text style={styles.forgotpassword}>te olvidaste la contraseña</Text>

                <Boton texto="iniciar sesión" onPress={handleLogin} />
                <StatusBar style="auto" />
            </View>
        </ImageBackground>
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
