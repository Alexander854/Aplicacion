import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { primaryColor } from "../config/colors";

export default function Boton({ texto, onPress, style, textStyle }) {
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    try {
      setLoading(true);
      await onPress();
    } catch (error) {
      console.error("Error al ejecutar la tarea:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        disabled={loading} // Desactivar el botón mientras carga
        style={[styles.button, style]} // Aplicar estilo personalizado si se pasa
      >
        <Text style={[styles.buttonText, textStyle]}>{texto}</Text>
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
    backgroundColor: primaryColor,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  loader: {
    marginTop: 10,
  },
});
