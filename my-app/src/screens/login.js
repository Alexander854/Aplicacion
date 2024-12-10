import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { auth } from '../config/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';

export default function Login({ navigation }) {
    const [identifier, setIdentifier] = useState(''); // Puede ser nombre o correo electrónico
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkUserSession = async () => {
            const token = await AsyncStorage.getItem('userToken');
        };
        checkUserSession();
    }, []);

    const onLoginPressed = async () => {
        if (!identifier || !password) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }
        setLoading(true);
        try {
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
            const loginIdentifier = isEmail ? identifier : `${identifier}@example.com`;

            await signInWithEmailAndPassword(auth, loginIdentifier, password);
            const token = await auth.currentUser.getIdToken();
            await AsyncStorage.setItem('userToken', token);
            navigation.reset({ index: 0, routes: [{ name: 'LoadingScreen' }] });
        } catch (error) {
            Alert.alert('Error de inicio de sesión', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Bienvenido</Text>
            <TextInput
                label="Correo Electrónico"
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
                keyboardType="default"
                style={styles.input}
            />
            <TextInput
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button mode="contained" onPress={onLoginPressed} style={styles.button}>
                Iniciar sesión
            </Button>
            <View style={styles.row}>
                <Text>¿No tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.replace('registrate')}>
                    <Text style={styles.link}>Regístrate</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { marginBottom: 16 },
    button: { marginTop: 16 },
    row: { flexDirection: 'row', marginTop: 12, justifyContent: 'center' },
    link: { fontWeight: 'bold', color: 'blue' },
});
