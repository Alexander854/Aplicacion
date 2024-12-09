import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Modal, TextInput, Button } from 'react-native';
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import { darkTheme } from '../config/tema';

export default function Recetas({ navigation }) {
  const [recipes, setRecipes] = useState([]); // Estado para las recetas
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal de edición
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // Estado para el modal de eliminación
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Receta seleccionada para editar
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedDifficulty, setUpdatedDifficulty] = useState('');
  const [updatedIngredients, setUpdatedIngredients] = useState('');
  const [updatedInstructions, setUpdatedInstructions] = useState('');
  const [updatedCookingTime, setUpdatedCookingTime] = useState('');

  useEffect(() => {
    // Escuchar cambios en tiempo real en la colección 'recetas'
    const unsubscribe = onSnapshot(collection(db, 'recetas'), (querySnapshot) => {
      const fetchedRecipes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(fetchedRecipes); // Actualizar el estado con las recetas obtenidas
    });

    // Limpiar la suscripción cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  const handleNavigateToDetails = (recipe) => {
    navigation.navigate("RecipeDetails", { recipe }); // Navegar a la pantalla de detalles de la receta
  };

  const handleNavigateToEdit = (recipe) => {
    setSelectedRecipe(recipe);
    setUpdatedTitle(recipe.title);
    setUpdatedDescription(recipe.description);
    setUpdatedDifficulty(recipe.difficulty || '');
    setUpdatedIngredients(recipe.ingredients || '');
    setUpdatedInstructions(recipe.instructions || '');
    setUpdatedCookingTime(recipe.cookingTime || '');
    setModalVisible(true); // Abrir el modal para editar la receta
  };

  const handleDeleteRecipe = async (recipeId) => {
    setSelectedRecipe(recipeId); // Asignar la receta seleccionada
    setDeleteModalVisible(true); // Mostrar el modal de confirmación de eliminación
  };

  const confirmDeleteRecipe = async () => {
    try {
      // Eliminar receta de Firestore
      await deleteDoc(doc(db, 'recetas', selectedRecipe));
      setDeleteModalVisible(false); // Cerrar el modal de confirmación
      Alert.alert('Receta eliminada', 'La receta se ha eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar la receta:', error);
      Alert.alert('Error', 'Hubo un error al eliminar la receta.');
    }
  };

  const handleUpdateRecipe = async () => {
    if (!updatedTitle || !updatedDescription) {
      Alert.alert('Campos incompletos', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      // Actualizar receta en Firestore
      const recipeRef = doc(db, 'recetas', selectedRecipe.id);
      await updateDoc(recipeRef, {
        title: updatedTitle,
        description: updatedDescription,
        difficulty: updatedDifficulty,
        ingredients: updatedIngredients,
        instructions: updatedInstructions,
        cookingTime: updatedCookingTime,
      });

      Alert.alert('Receta actualizada', 'La receta ha sido actualizada correctamente.');
      setModalVisible(false); // Cerrar el modal después de la actualización
    } catch (error) {
      console.error('Error al actualizar la receta:', error);
      Alert.alert('Error', 'Hubo un error al actualizar la receta.');
    }
  };

  const renderRecipe = ({ item }) => (
    <View style={styles.recipeContainer}>
      <TouchableOpacity onPress={() => handleNavigateToDetails(item)}>
        <Text style={styles.recipeName}>{item.title}</Text> 
      </TouchableOpacity>

    
      <TouchableOpacity style={styles.editButton} onPress={() => handleNavigateToEdit(item)}>
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>

    
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteRecipe(item.id)}>
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (

      <View style={styles.container}>
        <Text style={styles.titulo}>Recetas</Text>
        <FlatList
          data={recipes}
          renderItem={renderRecipe}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.recipeList}
        />


    
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Editar Receta</Text>

              <TextInput
                style={styles.input}
                placeholder="Título"
                value={updatedTitle}
                onChangeText={setUpdatedTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={updatedDescription}
                onChangeText={setUpdatedDescription}
              />
              <TextInput
                style={styles.input}
                placeholder="Dificultad"
                value={updatedDifficulty}
                onChangeText={setUpdatedDifficulty}
              />
              <TextInput
                style={styles.input}
                placeholder="Ingredientes"
                value={updatedIngredients}
                onChangeText={setUpdatedIngredients}
              />
              <TextInput
                style={styles.input}
                placeholder="Instrucciones"
                value={updatedInstructions}
                onChangeText={setUpdatedInstructions}
              />
              <TextInput
                style={styles.input}
                placeholder="Tiempo de cocción"
                value={updatedCookingTime}
                onChangeText={setUpdatedCookingTime}
                keyboardType="numeric"
              />

              <View style={styles.modalButtons}>
                <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                <Button title="Guardar Cambios" onPress={handleUpdateRecipe} />
              </View>
            </View>
          </View>
        </Modal>

        <Modal visible={deleteModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>¿Estás seguro?</Text>
              <Text>¿Quieres eliminar esta receta?</Text>

              <View style={styles.modalButtons}>
                <Button title="Cancelar" onPress={() => setDeleteModalVisible(false)} />
                <Button title="Eliminar" onPress={confirmDeleteRecipe} />
              </View>
            </View>
          </View>
        </Modal>

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
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color:'#9F14C9',// Cambia según el estado
    marginBottom: 20,
  },
  recipeList: {
    width: '100%',
    paddingHorizontal: 20,
  },
  recipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9F14C9' , // Cambia según el estado
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 30,
    color: '#fff',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tituloDark: {
    color: 'white',
  }
});

