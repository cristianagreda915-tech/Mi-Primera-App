import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function UsuarioDetalle() {
  const router = useRouter();

  const {
    id,
    nombre,
    usuario,
    correo,
    telefono,
    sitio,
    empresa,
    ciudad,
  } = useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Detalle del Usuario</Text>

      <View style={styles.card}>
        <Text style={styles.nombre}>{nombre}</Text>

        <Text style={styles.info}>ID: {id}</Text>
        <Text style={styles.info}>Usuario: {usuario}</Text>
        <Text style={styles.info}>Correo: {correo}</Text>
        <Text style={styles.info}>Teléfono: {telefono}</Text>
        <Text style={styles.info}>Sitio web: {sitio}</Text>
        <Text style={styles.info}>Empresa: {empresa}</Text>
        <Text style={styles.info}>Ciudad: {ciudad}</Text>
      </View>

      <Pressable style={styles.boton} onPress={() => router.back()}>
        <Text style={styles.botonTexto}>Volver</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#eef2f7",
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 18,
    elevation: 4,
    marginBottom: 20,
  },
  nombre: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },
  info: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 8,
  },
  boton: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  botonTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});