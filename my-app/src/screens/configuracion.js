import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, TextInput, Button } from 'react-native';
import { useAuth } from '../components/UserContext'; // Mantenemos solo esta importación de useAuth
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../config/FirebaseConfig'; // Firebase configuration and auth
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'; // Firestore functions

const OPTIONS = [
    { id: '1', name: 'Modificar Nombre', action: 'modifyName' },
    { id: '2', name: 'Modificar Contraseña', action: 'modifyPassword' },
    { id: '3', name: 'Borrar Cuenta', action: 'deleteAccount' },
    { id: '4', name: 'Cerrar Sesión', action: 'logout' },
    { id: '5', name: 'Ver Perfil', action: 'viewProfile' },
];

export default function Configuracion() {
    const { user, logout } = useAuth();
    const navigation = useNavigation();

    const [selectedAction, setSelectedAction] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleOptionPress = (action) => {
        console.log(`Acción seleccionada: ${action}`); // Ver qué acción se seleccionó
        setSelectedAction(action);
        setInputValue('');
        
        if (action === 'deleteAccount') {
            // Confirmación mediante modal
            setModalMessage('¿Estás seguro de que deseas borrar tu cuenta? Esta acción no se puede deshacer.');
            setIsModalVisible(true);
        } else if (['modifyEmail', 'modifyName', 'modifyPassword'].includes(action)) {
            if (action === 'modifyEmail') {
                setModalMessage('Ingrese el nuevo correo electrónico:');
            } else if (action === 'modifyName') {
                setModalMessage('Ingrese el nuevo nombre:');
            } else if (action === 'modifyPassword') {
                setModalMessage('Ingrese la nueva contraseña:');
            }
            setIsModalVisible(true);
        } else {
            handleOtherActions(action);
        }
    };

    const handleOtherActions = async (action) => {
        switch(action) {
            case 'logout':
                await logout();
                Alert.alert('Éxito', 'Has cerrado sesión exitosamente.');
                navigation.navigate('Login');
                break;
            case 'viewProfile':
                navigation.navigate('Perfil');
                break;
            default:
                break;
        }
    };

    const handleModalSubmit = async () => {
        try {
            if (selectedAction === 'modifyEmail') {
                await updateDoc(doc(db, 'users', user.uid), { email: inputValue });
                Alert.alert('Éxito', 'Correo electrónico modificado exitosamente.');
            } else if (selectedAction === 'modifyName') {
                await updateDoc(doc(db, 'users', user.uid), { name: inputValue });
                Alert.alert('Éxito', 'Nombre modificado exitosamente.');
            } else if (selectedAction === 'modifyPassword') {
                const userRef = auth.currentUser;
                if (userRef) {
                    await userRef.updatePassword(inputValue);
                    Alert.alert('Éxito', 'Contraseña modificada exitosamente.');
                } else {
                    Alert.alert('Error', 'No se pudo actualizar la contraseña.');
                }
            }
        } catch (error) {
            console.error('Error al realizar la acción:', error);
            Alert.alert('Error', 'No se pudo completar la acción.');
        } finally {
            setIsModalVisible(false);
            setInputValue('');
        }
    };

    const handleModalConfirm = async () => {
        try {
            console.log('Verificando autenticación...');
            // Verificar si el usuario está autenticado
            if (!user || !auth.currentUser) {
                throw new Error('No hay usuario autenticado');
            }
            console.log('Usuario autenticado:', user);

            // Eliminar los datos del usuario en Firestore
            console.log('Eliminando datos del usuario en Firestore...');
            await deleteDoc(doc(db, 'users', user.uid));
            console.log('Datos del usuario eliminados de Firestore.');

            // Eliminar la cuenta del usuario en Firebase Authentication
            console.log('Eliminando cuenta en Firebase Authentication...');
            await auth.currentUser.delete();
            console.log('Cuenta eliminada de Firebase Auth.');

            // Eliminar al usuario del contexto y limpiar el almacenamiento
            console.log('Cerrando sesión y limpiando datos...');
            await logout();

            // Notificar al usuario y redirigir al login
            Alert.alert('Éxito', 'Cuenta borrada exitosamente.');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error al borrar la cuenta:', error);
            // Mostrar el mensaje de error de acuerdo con el tipo de error
            if (error.message.includes('No hay usuario autenticado')) {
                Alert.alert('Error', 'No se pudo encontrar al usuario. Por favor, vuelve a iniciar sesión.');
            } else if (error.code === 'auth/requires-recent-login') {
                Alert.alert('Error', 'Debes iniciar sesión nuevamente para eliminar tu cuenta.');
            } else {
                Alert.alert('Error', 'No se pudo borrar la cuenta. Intenta nuevamente.');
            }
        } finally {
            // Cerrar el modal
            setIsModalVisible(false);
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
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

    
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={handleModalCancel}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalMessage}>{modalMessage}</Text>
                        {['modifyEmail', 'modifyName', 'modifyPassword'].includes(selectedAction) && (
                            <TextInput
                                style={styles.input}
                                placeholder="Ingrese nuevo valor"
                                value={inputValue}
                                onChangeText={setInputValue}
                            />
                        )}
                        <View style={styles.modalButtons}>
                            <Button title="Cancelar" onPress={handleModalCancel} />
                            <Button title="Guardar" onPress={handleModalSubmit} />
                        </View>
                    </View>
                </View>
            </Modal>

        
            <Modal
                visible={isModalVisible && selectedAction === 'deleteAccount'}
                animationType="slide"
                transparent={true}
                onRequestClose={handleModalCancel}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalMessage}>{modalMessage}</Text>
                        <View style={styles.modalButtons}>
                            <Button title="Cancelar" onPress={handleModalCancel} />
                            <Button title="Sí, Eliminar" onPress={handleModalConfirm} />
                        </View>
                    </View>
                </View>
            </Modal>
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
        padding: 10,
        borderRadius: 10,
    },
    optionName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalMessage: {
        fontSize: 20,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 16,
    },
});
