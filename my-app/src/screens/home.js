import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Inicio() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigation =useNavigation()

    // Función para manejar la búsqueda
    const handleSearch = () => {
        console.log('Buscando recetas para:', searchQuery);
    };

    // Función para navegar a la pantalla de creación de recetas
    const handleCreateRecipe = () => {
        console.log('Navegando a CrearReceta');
        navigation.navigate("CrearReceta");
    };

    return (
        <ImageBackground
            source={require("../../assets/login.jpg")}
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.titulo}>Bienvenido</Text>

                {/* Barra de búsqueda y botón de filtro */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Buscar recetas..."
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>Filtrar</Text>
                    </TouchableOpacity>
                </View>

                {/* Botón para buscar */}
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Buscar</Text>
                </TouchableOpacity>

                {/* Botón para crear una receta */}
                <TouchableOpacity style={styles.createButton} onPress={handleCreateRecipe}>
                    <Text style={styles.createButtonText}>Crear una receta</Text>
                </TouchableOpacity>

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
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 10,
    },
    textInput: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        paddingStart: 20,
        width: '70%',
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff'
    },
    filterButton: {
        backgroundColor: '#4285F4',
        padding: 10,
        borderRadius: 10,
        width: '25%',
        alignItems: 'center',
    },
    filterButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    searchButton: {
        backgroundColor: '#4285F4',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        width: '40%',
        alignItems: 'center',
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    createButton: {
        backgroundColor: '#34A853',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        width: '60%',
        alignItems: 'center',
    },
    createButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
