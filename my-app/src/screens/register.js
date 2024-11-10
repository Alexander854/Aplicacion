import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { auth, db } from '../config/FirebaseConfig'; // Adjust path as needed
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignUpPressed = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Save user data to Firestore
      await setDoc(doc(db, 'users', userId), {
        id: userId,
        name: name,
        email: email,
      });

      Alert.alert('Usuario creado', 'Registro exitoso');
      
      // Navigate to LoadingScreen for token check
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoadingScreen' }],
      });
    } catch (error) {
      console.error('Error de registro:', error);
      Alert.alert('Error de registro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crear Cuenta</Text>
      <TextInput label="Nombre" value={name} onChangeText={setName} style={styles.input} />
      <TextInput label="Correo Electrónico" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={styles.input} />
      <TextInput label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button mode="contained" onPress={onSignUpPressed} loading={loading} style={styles.button}>
        Registrarse
      </Button>
      <View style={styles.row}>
        <Text>¿Ya tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.link}>Iniciar sesión</Text>
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

// LoadingScreen Component
function LoadingScreen({ navigation }) {
  useEffect(() => {
    const checkToken = async () => {
      // Here you would check AsyncStorage or another storage method for the token
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        navigation.replace('Tabs');
      } else {
        navigation.replace('Login');
      }
    };
    checkToken();
  }, []);

  return (
    <View style={loadingStyles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Cargando...</Text>
    </View>
  );
}

const loadingStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
