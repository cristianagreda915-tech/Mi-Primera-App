import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Detalle() {
  const router = useRouter();
  const datos = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Datos Guardados</Text>

      <View style={styles.card}>
        <Text>ID: {datos.id}</Text>
        <Text>Nombre: {datos.nombre}</Text>
        <Text>Apellido: {datos.apellido}</Text>
        <Text>Edad: {datos.edad}</Text>
        <Text>Correo: {datos.correo}</Text>
        <Text>Teléfono: {datos.telefono}</Text>
        <Text>Programa: {datos.programa}</Text>
        <Text>Semestre: {datos.semestre}</Text>
        <Text>Ciudad: {datos.ciudad}</Text>
        <Text>Género: {datos.genero}</Text>
      </View>

      <Pressable style={styles.boton} onPress={() => router.push("/lista")}>
        <Text style={styles.botonTexto}>Ir a Lista</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#eef2f7",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
  },
  boton: {
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  botonTexto: {
    color: "white",
    fontWeight: "bold",
  },
});
