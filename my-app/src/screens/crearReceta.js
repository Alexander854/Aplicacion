import React, { useState } from 'react';
import { StatusBar, Alert, StyleSheet, Text, View, TextInput, ImageBackground } from 'react-native';
import Boton from "../components/Boton";
import { addRecipe } from '../config/api'; // Importa la URL de addRecipe desde tu archivo de configuración

export default function CrearReceta({ navigation }) {
    
    // Estados para los campos de la receta
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [difficulty, setDifficulty] = useState('');

    // Función para enviar la receta al backend
    const handleAddRecipe = async () => {
        try {
            const response = await fetch(addRecipe, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    ingredients,
                    instructions,
                    cooking_time: parseInt(cookingTime), // Asegúrate de enviar un número
                    difficulty,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Éxito", "La receta se ha creado correctamente.");
                navigation.navigate("Tabs"); // Navega de vuelta al inicio o donde prefieras
            } else {
                Alert.alert("Error", `No se pudo crear la receta: ${data.message}`);
            }
        } catch (error) {
            console.error("Error al crear receta: ", error);
            Alert.alert("Error", "Hubo un problema al crear la receta.");
        }
    };

    return (
        <ImageBackground
            source={require("../../assets/login.jpg")}
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.titulo}>Crear Receta</Text>

                <TextInput
                    placeholder="Título"
                    style={styles.textInput}
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    placeholder="Descripción"
                    style={styles.textInput}
                    value={description}
                    onChangeText={setDescription}
                />
                <TextInput
                    placeholder="Ingredientes"
                    style={styles.textInput}
                    value={ingredients}
                    onChangeText={setIngredients}
                />
                <TextInput
                    placeholder="Instrucciones"
                    style={styles.textInput}
                    value={instructions}
                    onChangeText={setInstructions}
                />
                <TextInput
                    placeholder="Tiempo de cocción (minutos)"
                    style={styles.textInput}
                    keyboardType="numeric"
                    value={cookingTime}
                    onChangeText={setCookingTime}
                />
                <TextInput
                    placeholder="Dificultad (Easy, Medium, Hard)"
                    style={styles.textInput}
                    value={difficulty}
                    onChangeText={setDifficulty}
                />

                <Boton texto="Guardar receta" onPress={handleAddRecipe} />

                <StatusBar style="auto" />
            </View>
        </ImageBackground>
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
        justifyContent: 'center'
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        justifyContent: 'center'
    },
    textInput: {
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        width: '80%',
        height: 50,
        marginTop: 10,
        borderRadius: 30,
        backgroundColor: '#fff'
    },
});
