import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Detalle() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { nombre, ciudad, programa, estado } = params;

    return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Detalle del Perfil</Text>

        <View style={styles.card}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.info}>📍 Ciudad: {ciudad}</Text>
        <Text style={styles.info}>📚 Programa: {programa}</Text>
        <Text style={[styles.info, estado === "Disponible" ? styles.disponible : styles.noDisponible]}>
            🟢 Estado: {estado}
        </Text>
        </View>

        <Pressable
        style={styles.botonVolver}
        onPress={() => router.back()}
        >
        <Text style={styles.botonTexto}>← Volver al inicio</Text>
        </Pressable>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20,
    justifyContent: "center",
    },

    titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
    },

    card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    marginBottom: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    },

    nombre: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
    textAlign: "center",
    },

    info: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 12,
    },

    disponible: {
    color: "#10b981",
    fontWeight: "600",
    },

    noDisponible: {
    color: "#ef4444",
    fontWeight: "600",
    },

    botonVolver: {
    backgroundColor: "#111827",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    },

    botonTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    },
});