import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function Inicio() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para controlar el tema
  const navigation = useNavigation();

  useEffect(() => {
    // Query to listen for real-time changes in the 'recetas' collection
    const q = searchTerm
      ? query(collection(db, 'recetas'), where('title', '>=', searchTerm), where('title', '<=', searchTerm + '\uf8ff'))
      : collection(db, 'recetas');
      
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedRecipes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(fetchedRecipes);
    });

    return () => unsubscribe(); // Cleanup the subscription on component unmount
  }, [searchTerm]);

  const handleNavigateToDetails = (recipe) => {
    navigation.navigate("RecipeDetail", { recipe });
  };

  const handleCreateRecipe = () => {
    navigation.navigate("CrearReceta"); // Navigate to the recipe creation screen
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode); // Cambiar entre modo claro y oscuro
  };

  const renderRecipe = ({ item }) => (
    <TouchableOpacity style={[styles.recipeContainer, isDarkMode && styles.recipeContainerDark]} onPress={() => handleNavigateToDetails(item)}>
      <Text style={[styles.recipeName, isDarkMode && styles.recipeNameDark]}>{item.title}</Text>
      <Button title="Detalles" onPress={() => handleNavigateToDetails(item)} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.titulo, isDarkMode && styles.tituloDark]}>Recetas destacadas</Text>

      {/* Search bar */}
      <TextInput
        style={[styles.searchInput, isDarkMode && styles.searchInputDark]}
        placeholder="Buscar recetas..."
        placeholderTextColor={isDarkMode ? '#ccc' : '#555'}
        value={searchTerm}
        onChangeText={setSearchTerm} // Set search term as user types
      />

      {/* Recipe List */}
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.recipeList}
      />

      {/* Button to navigate to the recipe creation screen */}
      <TouchableOpacity style={[styles.createButton, isDarkMode && styles.createButtonDark]} onPress={handleCreateRecipe}>
        <Text style={styles.createButtonText}>Crear Receta</Text>
      </TouchableOpacity>

      {/* Button to toggle theme */}
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Text style={styles.themeButtonText}>{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#333', // Fondo oscuro
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  tituloDark: {
    color: '#fff', // Texto blanco en modo oscuro
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInputDark: {
    borderColor: '#888', // Borde gris en modo oscuro
    backgroundColor: '#444', // Fondo gris oscuro
    color: '#fff', // Texto blanco
  },
  recipeList: {
    paddingHorizontal: 10,
  },
  recipeContainer: {
    backgroundColor: '#eee',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recipeContainerDark: {
    backgroundColor: '#555', // Fondo oscuro en las recetas
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recipeNameDark: {
    color: '#fff', // Texto blanco en modo oscuro
  },
  createButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonDark: {
    backgroundColor: '#2c6f2f', // Fondo verde oscuro en modo oscuro
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  themeButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  themeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
