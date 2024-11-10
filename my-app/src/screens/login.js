import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { auth } from '../config/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth'; // Importar la función para acceder a la autenticación de Firebase

const handleModalSubmit = async () => {
    try {
        const auth = getAuth(); // Obtener la instancia de autenticación
        switch (selectedAction) {
            case 'modifyEmail':
                await updateDoc(doc(db, 'users', user.uid), { email: inputValue });
                await auth.currentUser.updateEmail(inputValue); // Actualizar el correo electrónico en Firebase Authentication
                Alert.alert('Éxito', 'Correo electrónico modificado exitosamente.');
                break;
            case 'modifyName':
                await updateDoc(doc(db, 'users', user.uid), { name: inputValue });
                // Si deseas actualizar también el displayName en Firebase Authentication
                await auth.currentUser.updateProfile({ displayName: inputValue });
                Alert.alert('Éxito', 'Nombre modificado exitosamente.');
                break;
            // ... el resto de tu lógica
        }
    } catch (error) {
        console.error('Error al realizar la acción:', error);
        Alert.alert('Error', 'No se pudo completar la acción.');
    } finally {
        setModalVisible(false);
        setInputValue(''); // Limpiar el campo de entrada
    }
};

export default function Login({ navigation }) {
    const [identifier, setIdentifier] = useState(''); // Puede ser nombre o correo electrónico
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkUserSession = async () => {
            const token = await AsyncStorage.getItem('userToken');
            // Uncomment if you want to redirect users with existing tokens
            // if (token) {
            //     navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
            // }
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
            // Aquí puedes agregar lógica para verificar si el identificador es un correo electrónico o un nombre
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
            const loginIdentifier = isEmail ? identifier : `${identifier}@example.com`; // Asume un dominio para nombres de usuario

            await signInWithEmailAndPassword(auth, loginIdentifier, password);
            const token = await auth.currentUser.getIdToken();
            await AsyncStorage.setItem('userToken', token);
            navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
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
            <Button mode="contained" onPress={onLoginPressed} loading={loading} style={styles.button}>
                Iniciar sesión
            </Button>
            <View style={styles.row}>
                <Text>¿No tienes una cuenta? </Text>
                <TouchableOpacity onPress={() => navigation.replace('registrate')}>
                    <Text style={styles.link}>Regístrate</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <Text>¿Te olvidaste la contraseña?</Text>
            </View>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
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
