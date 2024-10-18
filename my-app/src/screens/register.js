import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Boton from '../components/Boton'; // Asegúrate de que Boton esté en la ubicación correcta
import { signup } from '../config/api'; // Importa la URL de signup desde tu archivo de configuración

export default function Register({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        if (!username || !email || !password) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await fetch(signup, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Éxito', 'Cuenta creada con éxito');
                navigation.navigate('Login'); // Redirige a la pantalla de inicio de sesión
            } else {
                Alert.alert('Error', result.message || 'No se pudo crear la cuenta');
            }
        } catch (error) {
            console.error('Error al registrar la cuenta:', error);
            Alert.alert('Error', 'Error al conectar con el servidor');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrarse</Text>
            <TextInput
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
                style={styles.textInput}
            />
            <TextInput
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.textInput}
            />
            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.textInput}
            />
            <Boton texto="Registrarse" onPress={handleSignUp} />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>¿Ya tienes una cuenta? Inicia sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textInput: {
        width: '80%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    loginText: {
        marginTop: 15,
        fontSize: 16,
        color: 'blue',
    },
});
