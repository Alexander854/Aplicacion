import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { primaryColor } from "../config/colors"; // Asegúrate de que primaryColor esté correctamente definido

export default function Boton({ texto, onPress, style, textStyle }) {
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    console.log('Botón presionado'); // Depuración: Verifica que el botón fue presionado
    try {
      setLoading(true);
      await onPress(); // Llama a la función onPress pasada como prop
    } catch (error) {
      console.error("Error al ejecutar la tarea:", error);
    } finally {
      setLoading(false); // Asegúrate de que loading vuelve a false después de la tarea
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={handlePress} 
        disabled={loading} 
        style={[styles.button, style, loading && styles.buttonDisabled]} // Aplica estilo cuando está deshabilitado
      >
        <Text style={[styles.buttonText, textStyle]}>
          {loading ? "Cargando..." : texto} {/* Muestra "Cargando..." mientras loading es true */}
        </Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator style={styles.loader} color="blue" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    padding: 10,
    backgroundColor: primaryColor || 'blue', // Usa un color de respaldo si primaryColor no está definido
    borderRadius: 30,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7, // Reduce opacidad cuando está deshabilitado
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  loader: {
    marginTop: 10,
  },
});
