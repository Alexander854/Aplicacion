import React, { useState } from "react";
import { StatusBar, Alert, StyleSheet, Text, View, TextInput } from 'react-native';
import Boton from "../components/Boton";
import { auth } from '../config/FirebaseConfig'; 
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation }) {
    const [name, setName] = useState({ value: '', error: '' }); // Campo de nombre
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const adminEmail = "admin@gmail.com"; // Define el correo de admin aquí

    const emailValidator = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email) ? '' : 'Correo electrónico no válido.';
    };

    const passwordValidator = (password) => {
        return password.length < 6 ? 'La contraseña debe tener al menos 6 caracteres.' : '';
    };

    const nameValidator = (name) => {
        return name.length === 0 ? 'El nombre es requerido.' : ''; // Valida que el campo de nombre no esté vacío
    };

    const onLoginPressed = async () => {
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (nameError || emailError || passwordError) {
            setName({ ...name, error: nameError });
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return; // No continuar si hay errores
        }

        try {
            await signInWithEmailAndPassword(auth, email.value, password.value);

            // Verificación del correo del administrador
            if (email.value === adminEmail) {
                navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
            } else {
                navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
            }
        } catch (error) {
            Alert.alert('Error de inicio de sesión', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Bienvenido</Text>
            <Text style={styles.subtitulo}>Inicia con tu cuenta</Text>

            <TextInput
                placeholder="Nombre"
                style={[styles.input, { fontSize: 20, borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 30 }]}
                value={name.value}
                onChangeText={text => setName({ value: text, error: '' })}
            />
            {name.error ? <Text style={styles.error}>{name.error}</Text> : null}

            <TextInput
                placeholder="Correo Electrónico"
                style={[styles.input, { fontSize: 20, borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 30 }]}
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
            />
            {email.error ? <Text style={styles.error}>{email.error}</Text> : null}

            <TextInput
                placeholder="Contraseña"
                style={[styles.input, { fontSize: 20, borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 30 }]}
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: '' })}
                secureTextEntry
            />
            {password.error ? <Text style={styles.error}>{password.error}</Text> : null}

            <View style={styles.row}>
                <Text style={styles.link}>¿No tienes una cuenta? Regístrate</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.link}>¿Te olvidaste la contraseña?</Text>
            </View>

            <Boton texto="Iniciar sesión" onPress={onLoginPressed} style={styles.button} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 16,
        width: '80%', // Ajustar el ancho de los campos de entrada
    },
    button: {
        marginTop: 16,
    },
    row: {
        flexDirection: 'row',
        marginTop: 12,
        justifyContent: 'center',
    },
    link: {
        fontWeight: 'bold',
        color: 'blue',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});
