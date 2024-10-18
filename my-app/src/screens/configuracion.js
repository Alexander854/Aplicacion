import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const OPTIONS = [
    { id: '1', name: 'Modificar Correo Electrónico', action: 'modifyEmail' },
    { id: '2', name: 'Modificar Nombre', action: 'modifyName' },
    { id: '3', name: 'Modificar Contraseña', action: 'modifyPassword' },
    { id: '4', name: 'Borrar Cuenta', action: 'deleteAccount' },
    { id: '5', name: 'Recuperar Cuenta', action: 'recoverAccount' },
    { id: '6', name: 'Cerrar Sesión', action: 'logout' },
];

export default function Configuracion({ navigation }) {

    const handleOptionPress = (action) => {
        switch(action) {
            case 'modifyEmail':
                navigation.navigate('ModifyEmail');
                break;
            case 'modifyName':
                navigation.navigate('ModifyName');
                break;
            case 'modifyPassword':
                navigation.navigate('ModifyPassword');
                break;
            case 'deleteAccount':
                Alert.alert('Confirmación', '¿Estás seguro de que deseas borrar tu cuenta?', [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Sí', onPress: () => console.log('Cuenta borrada') }
                ]);
                break;
            case 'recoverAccount':
                navigation.navigate('RecoverAccount');
                break;
            case 'logout':
                <TouchableOpacity onPress={() => navigation.navigate('Logout')}>
               
                </TouchableOpacity>
                break;
            default:
                break;
        }
    };

    const renderOption = ({ item }) => (
        <TouchableOpacity onPress={() => handleOptionPress(item.action)}>
            <View style={styles.optionContainer}>
                <Text style={styles.optionName}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configuración</Text>
            <FlatList
                data={OPTIONS}
                renderItem={renderOption}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.optionList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
    },
    optionList: {
        width: '100%',
        paddingHorizontal: 20,
    },
    optionContainer: {
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
    optionName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});
