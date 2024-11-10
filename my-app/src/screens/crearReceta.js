import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../components/UserContext'; // Importar el contexto
import { db } from '../config/FirebaseConfig'; // Asegúrate de importar la configuración de Firebase
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'; // Funciones de Firestore

export default function CrearReceta({ navigation, route }) {
  const { user, darkModeEnabled, editReceta, deleteReceta } = useAuth(); // Usamos el contexto
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  
  // Si estamos editando una receta, cargamos sus datos en el estado
  useEffect(() => {
    if (route.params?.receta) {
      const { receta } = route.params;
      setTitle(receta.title);
      setDescription(receta.description);
      setIngredients(receta.ingredients);
      setInstructions(receta.instructions);
      setCookingTime(receta.cookingTime.toString());
      setDifficulty(receta.difficulty);
    }
  }, [route.params?.receta]);

  const handleCreateOrUpdateReceta = async () => {
    if (title.trim() && description.trim() && ingredients.trim() && instructions.trim()) {
      try {
        if (route.params?.receta) {
          // Si estamos editando, usamos `updateDoc`
          const recetaRef = doc(db, 'recetas', route.params.receta.id); // Obtener referencia del documento
          await updateDoc(recetaRef, {
            title,
            description,
            ingredients,
            instructions,
            cookingTime: parseInt(cookingTime),
            difficulty,
          });
        } else {
          // Si estamos creando, usamos `addDoc`
          await addDoc(collection(db, 'recetas'), {
            title,
            description,
            ingredients,
            instructions,
            cookingTime: parseInt(cookingTime),
            difficulty,
            author: user?.uid,
            createdAt: serverTimestamp(),
          });
        }
        
        // Navegar después de la creación o actualización
        navigation.goBack();
      } catch (error) {
        console.error('Error al guardar la receta:', error);
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const handleDeleteReceta = async () => {
    if (route.params?.receta) {
      await deleteReceta(route.params.receta.id);
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, darkModeEnabled && styles.darkContainer]}>
      <Text style={[styles.label, darkModeEnabled && styles.darkLabel]}>Título de la receta</Text>
      <TextInput
        style={[styles.input, darkModeEnabled && styles.darkInput]}
        placeholder="Ingresa el título de la receta"
        placeholderTextColor={darkModeEnabled ? '#ccc' : '#999'}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={[styles.label, darkModeEnabled && styles.darkLabel]}>Descripción</Text>
      <TextInput
        style={[styles.input, darkModeEnabled && styles.darkInput]}
        placeholder="Ingresa la descripción de la receta"
        placeholderTextColor={darkModeEnabled ? '#ccc' : '#999'}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={[styles.label, darkModeEnabled && styles.darkLabel]}>Ingredientes</Text>
      <TextInput
        style={[styles.input, darkModeEnabled && styles.darkInput]}
        placeholder="Lista los ingredientes"
        placeholderTextColor={darkModeEnabled ? '#ccc' : '#999'}
        value={ingredients}
        onChangeText={setIngredients}
        multiline
      />

      <Text style={[styles.label, darkModeEnabled && styles.darkLabel]}>Instrucciones</Text>
      <TextInput
        style={[styles.input, darkModeEnabled && styles.darkInput]}
        placeholder="Escribe las instrucciones"
        placeholderTextColor={darkModeEnabled ? '#ccc' : '#999'}
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />

      <Text style={[styles.label, darkModeEnabled && styles.darkLabel]}>Tiempo de cocción (minutos)</Text>
      <TextInput
        style={[styles.input, darkModeEnabled && styles.darkInput]}
        placeholder="Tiempo de cocción"
        keyboardType="numeric"
        placeholderTextColor={darkModeEnabled ? '#ccc' : '#999'}
        value={cookingTime}
        onChangeText={setCookingTime}
      />

      <Text style={[styles.label, darkModeEnabled && styles.darkLabel]}>Dificultad</Text>
      <TextInput
        style={[styles.input, darkModeEnabled && styles.darkInput]}
        placeholder="Dificultad (Easy, Medium, Hard)"
        placeholderTextColor={darkModeEnabled ? '#ccc' : '#999'}
        value={difficulty}
        onChangeText={setDifficulty}
      />

      <Button
        title={route.params?.receta ? 'Actualizar Receta' : 'Crear Receta'}
        onPress={handleCreateOrUpdateReceta}
        color={darkModeEnabled ? '#fff' : '#2196F3'}
      />

      {route.params?.receta && (
        <Button
          title="Eliminar Receta"
          onPress={handleDeleteReceta}
          color="#FF0000"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  darkLabel: {
    color: '#fff',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  darkInput: {
    borderColor: '#444',
    backgroundColor: '#333',
    color: '#fff',
  },
});
