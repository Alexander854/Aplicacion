import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';


const RECIPES = [
    { id: '1', name: 'Spaghetti Bolognese', image: require('../../assets/icon.png') },
    { id: '2', name: 'Chicken Curry', image: require('../../assets/icon.png') },
    { id: '3', name: 'Beef Stroganoff', image: require('../../assets/icon.png') },
    // Agrega más recetas aquí
];

export default function InicioTabs({ navigation }) {
    const handleNavigateToDetails = (recipe) => {
        navigation.navigate("RecipeDetails", { recipe });
    };

    const renderRecipe = ({ item }) => (
        <TouchableOpacity onPress={() => handleNavigateToDetails(item)}>
            <View style={styles.recipeContainer}>
                <Image source={item.image} style={styles.recipeImage} />
                <Text style={styles.recipeName}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Recetas</Text>
            <FlatList
                data={RECIPES}
                renderItem={renderRecipe}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.recipeList}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    recipeList: {
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
        color: '#333',
    },
});
