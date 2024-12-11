import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { doc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import { getAuth } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa el ícono de la flecha

export default function RecipeDetail({ route, navigation }) {
  const { recipe } = route.params;
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState(recipe.comments || []);
  const [creatorName, setCreatorName] = useState('');
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleAddComment = async () => {
    if (!comment || !rating) {
      Alert.alert("Campos incompletos", "Por favor ingresa tanto un comentario como una calificación.");
      return;
    }

    if (!currentUser) {
      Alert.alert("No estás logueado", "Debes iniciar sesión para agregar un comentario.");
      return;
    }

    if (parseInt(rating, 10) < 1 || parseInt(rating, 10) > 5) {
      Alert.alert("Calificación inválida", "La calificación debe estar entre 1 y 5.");
      return;
    }

    try {
      const recipeRef = doc(db, 'recetas', recipe.id);
      const newComment = {
        text: comment,
        rating: parseInt(rating, 10),
        userId: currentUser.uid,
      };

      await updateDoc(recipeRef, {
        comments: arrayUnion(newComment),
      });

      Alert.alert("Comentario agregado", "Tu comentario ha sido agregado.");
      setComment('');
      setRating('');
    } catch (error) {
      console.error("Error agregando comentario:", error);
      Alert.alert("Error", "Hubo un error al agregar tu comentario.");
    }
  };

  useEffect(() => {
    const recipeRef = doc(db, 'recetas', recipe.id);
    const unsubscribe = onSnapshot(recipeRef, (docSnapshot) => {
      const updatedRecipe = docSnapshot.data();
      if (updatedRecipe && updatedRecipe.comments) {
        setComments(updatedRecipe.comments);
      }
      if (updatedRecipe && updatedRecipe.userId) {
        fetchUserName(updatedRecipe.userId);
      }
    });

    return () => unsubscribe();
  }, [recipe.id]);

  const fetchUserName = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await userRef.get();
      if (userDoc.exists()) {
        setCreatorName(userDoc.data().name);
      } else {
        setCreatorName('Usuario Desconocido');
      }
    } catch (error) {
      console.error("Error obteniendo los datos del usuario:", error);
      setCreatorName('Error al obtener el nombre');
    }
  };

  return (
    <View style={styles.container}>

      <Icon 
        name="arrow-left" 
        size={30} 
        color="#000" 
        style={styles.backButton} 
        onPress={() => navigation.goBack()} 
      />

      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.description}>{recipe.description}</Text>
      <Text style={styles.description}>Ingredientes: {recipe.ingredients}</Text>
      <Text style={styles.description}>Instrucciones: {recipe.instructions}</Text>
      <Text style={styles.description}>Tiempo de Cocina: {recipe.cookingTime || 'No disponible'}</Text> 
      <Text style={styles.details}>Difficulty: {recipe.difficulty}</Text>

      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text>{item.text}</Text> 
            <Text>Calificación: {item.rating}</Text>
          </View>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Agrega un comentario"
        value={comment}
        onChangeText={setComment}
      />
      <TextInput
        style={styles.input}
        placeholder="Calificación (1-5)"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />

      <Button title="Agregar Comentario" onPress={handleAddComment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 40 }, // Agrega un margen superior al título
  description: { fontSize: 16, marginBottom: 10 },
  commentContainer: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  creator: { fontSize: 16, fontStyle: 'italic', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
});
