import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity, Image } from 'react-native';

const RECIPES = [
    { id: '1', name: 'Spaghetti Bolognese', image: require('../../assets/spaghetti.png') },
    { id: '2', name: 'Chicken Curry', image: require('../../assets/curry.png') },
    { id: '3', name: 'Beef Stroganoff', image: require('../../assets/beef.png') },
    // Agrega más recetas aquí
];

export default function Recetas({ navigation }) {

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
        <ImageBackground
            source={require("../../assets/background-recetas.png")}
            resizeMode="cover"
            style={styles.background}
        >
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
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
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
        color: '#333',
    },
});
