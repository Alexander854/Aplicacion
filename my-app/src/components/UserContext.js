import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../config/FirebaseConfig'; // Asegúrate de tener acceso a Firestore
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore'; // Métodos de Firestore

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('darkMode');
        if (storedTheme !== null) {
          setDarkModeEnabled(JSON.parse(storedTheme));
        }
      } catch (error) {
        console.error("Error checking user session: ", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await AsyncStorage.setItem('user', JSON.stringify(currentUser));
        setUser(currentUser);
      } else {
        await AsyncStorage.removeItem('user');
        setUser(null);
      }
      setLoading(false);
    });

    checkUserSession();
    return unsubscribe;
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !darkModeEnabled;
    setDarkModeEnabled(newMode);
    await AsyncStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  // Función para crear una receta
  const createRecipe = async (title, description) => {
    if (title.trim() && description.trim()) {
      try {
        await addDoc(collection(db, 'recetas'), {
          title,
          description,
          author: user?.uid, // Guardar el ID del usuario actual
          createdAt: serverTimestamp(),
        });
        console.log('Receta creada con éxito');
      } catch (error) {
        console.error('Error creando receta:', error);
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  // Función para editar una receta
  const editRecipe = async (recipeId, updatedTitle, updatedDescription) => {
    if (updatedTitle.trim() && updatedDescription.trim()) {
      try {
        const recipeRef = doc(db, 'recetas', recipeId);
        await updateDoc(recipeRef, {
          title: updatedTitle,
          description: updatedDescription,
          updatedAt: serverTimestamp(),
        });
        console.log('Receta actualizada con éxito');
      } catch (error) {
        console.error('Error actualizando receta:', error);
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  // Función para borrar una receta
  const deleteRecipe = async (recipeId) => {
    try {
      const recipeRef = doc(db, 'recetas', recipeId);
      await deleteDoc(recipeRef);
      console.log('Receta eliminada con éxito');
    } catch (error) {
      console.error('Error eliminando receta:', error);
    }
  };

  // Función para eliminar la cuenta del usuario
  const deleteAccount = async () => {
    try {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await deleteDoc(userRef);
        await auth.currentUser.delete();
        await AsyncStorage.removeItem('user');
        setUser(null);
        await signOut(auth);
      } else {
        console.log('No hay un usuario autenticado para eliminar.');
      }
    } catch (error) {
      console.error("Error al eliminar la cuenta: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      deleteAccount,
      loading,
      darkModeEnabled,
      toggleDarkMode,
      createRecipe,
      editRecipe,
      deleteRecipe,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
