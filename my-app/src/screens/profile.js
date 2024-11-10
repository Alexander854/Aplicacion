import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { auth, db } from '../config/FirebaseConfig'; // Adjust the path if necessary
import { doc, getDoc } from 'firebase/firestore';

export default function Profile({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser?.uid;

        if (userId) {
          const userDoc = await getDoc(doc(db, 'users', userId));

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log('No se encontró el documento del usuario');
          }
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil de Usuario</Text>
      {userData ? (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{userData.name}</Text>
          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.value}>{userData.email}</Text>
        </View>
      ) : (
        <Text style={styles.noDataText}>No se encontraron datos del usuario.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9', // Light background color
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark text color
  },
  infoContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff', // White background for info
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#555', // Dark gray color for labels
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
    color: '#000', // Black color for values
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  loader: {
    marginTop: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#777', // Light gray color for no data text
  },
});
