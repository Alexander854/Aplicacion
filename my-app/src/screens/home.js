import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { darkTheme,lightTheme } from '../config/themecontext';
export default function Inicio() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para controlar el tema
  const navigation = useNavigation();

  useEffect(() => {
    // Query para escuchar cambios en tiempo real de la colección 'recetas'
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

    return () => unsubscribe(); // Cleanup de la suscripción al desmontarse el componente
  }, [searchTerm]);

  const handleNavigateToDetails = (recipe) => {
    navigation.navigate("RecipeDetail", { recipe });
  };

  const handleCreateRecipe = () => {
    navigation.navigate("CrearReceta"); // Navegar a la pantalla de creación de recetas
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode); // Cambiar entre modo claro y oscuro
  };

  const renderRecipe = ({ item }) => (
    <TouchableOpacity style={[styles.recipeContainer, isDarkMode && styles.recipeContainerDark]} onPress={() => handleNavigateToDetails(item)}>
      <Text style={[styles.recipeName, isDarkMode && styles.recipeNameDark]}>{item.title}</Text>
      <TouchableOpacity style={[styles.detailsButton, isDarkMode && styles.detailsButtonDark]} onPress={() => handleNavigateToDetails(item)}>
        <Text style={styles.detailsButtonText}>Detalles</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.titulo, isDarkMode && styles.tituloDark]}>Recetas destacadas</Text>
      <TextInput
        style={[styles.searchInput, isDarkMode && styles.searchInputDark]}
        placeholder="Buscar recetas..."
        placeholderTextColor={isDarkMode ? 'lightblue' : '#555'}
        value={searchTerm}
        onChangeText={setSearchTerm} // Actualizar el término de búsqueda
      />
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.recipeList}
      />
      <TouchableOpacity style={[styles.createButton, isDarkMode && styles.createButtonDark]} onPress={handleCreateRecipe}>
        <Text style={styles.createButtonText}>Crear Receta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  containerDark: {
    backgroundColor: '#333', // Fondo oscuro en modo oscuro
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#9F14C9',
  },
  tituloDark: {
    color: darkTheme ? 'black' : lightTheme ? 'white' : 'black',    // Texto blanco en modo oscuro
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
    backgroundColor: '#555', // Fondo gris oscuro
    color: 'lightblue', // Texto blanco
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
  detailsButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonDark: {
    backgroundColor: '#2c6f2f', // Fondo verde oscuro en modo oscuro
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  createButton: {
    backgroundColor: 'lightblue',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonDark: {
    backgroundColor: 'lightblue', // Fondo verde oscuro en modo oscuro
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
