import React, { useState } from 'react';
import { StatusBar, Alert, StyleSheet, Text, View, TextInput } from 'react-native';
import Boton from '../components/Boton';
import { auth } from '../config/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ navigation }) {
    const [name, setName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [loading, setLoading] = useState(false); // Add loading state
    const adminEmail = 'admin@gmail.com';

    const emailValidator = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email) ? '' : 'Correo electrónico no válido.';
    };

    const passwordValidator = (password) => {
        return password.length < 6 ? 'La contraseña debe tener al menos 6 caracteres.' : '';
    };

    const nameValidator = (name) => {
        return name.length === 0 ? 'El nombre es requerido.' : '';
    };

    const onLoginPressed = async () => {
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (nameError || emailError || passwordError) {
            setName({ ...name, error: nameError });
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        setLoading(true); // Show loading indicator

        try {
            await signInWithEmailAndPassword(auth, email.value, password.value);

            // Redirect based on admin status
            const targetScreen = email.value === adminEmail ? 'Tabs' : 'Tabs';
            navigation.reset({ index: 0, routes: [{ name: targetScreen }] });
        } catch (error) {
            Alert.alert('Error de inicio de sesión', error.message);
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Bienvenido</Text>
            <Text style={styles.subtitulo}>Inicia con tu cuenta</Text>

            <TextInput
                placeholder="Nombre"
                style={styles.input}
                value={name.value}
                onChangeText={text => setName({ value: text, error: '' })}
            />
            {name.error ? <Text style={styles.error}>{name.error}</Text> : null}

            <TextInput
                placeholder="Correo Electrónico"
                style={styles.input}
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
            />
            {email.error ? <Text style={styles.error}>{email.error}</Text> : null}

            <TextInput
                placeholder="Contraseña"
                style={styles.input}
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
            {loading && <Text>Cargando...</Text>} {/* Temporary loading indicator */}

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
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 30,
        width: '80%',
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
