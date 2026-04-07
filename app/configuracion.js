import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

export default function Configuracion() {
    const router = useRouter();
    const [notificaciones, setNotificaciones] = useState(true);
    const [modoOscuro, setModoOscuro] = useState(false);
    const [ingles, setIngles] = useState(false);

    return (
    <View style={styles.container}>
        <Text style={styles.titulo}>⚙️ Configuración</Text>

        <View style={styles.card}>
        <Text style={styles.seccion}>Preferencias</Text>

        <View style={styles.fila}>
            <View>
            <Text style={styles.opcionTitulo}>Notificaciones</Text>
            <Text style={styles.opcionSub}>Recibir alertas y avisos</Text>
            </View>
            <Switch
            value={notificaciones}
            onValueChange={setNotificaciones}
            trackColor={{ false: "#d1d5db", true: "#111827" }}
            thumbColor={notificaciones ? "#fff" : "#9ca3af"}
            />
        </View>

        <View style={styles.divisor} />

        <View style={styles.fila}>
            <View>
            <Text style={styles.opcionTitulo}>Modo Oscuro</Text>
            <Text style={styles.opcionSub}>Cambiar apariencia</Text>
            </View>
            <Switch
            value={modoOscuro}
            onValueChange={setModoOscuro}
            trackColor={{ false: "#d1d5db", true: "#111827" }}
            thumbColor={modoOscuro ? "#fff" : "#9ca3af"}
            />
        </View>

        <View style={styles.divisor} />

        <View style={styles.fila}>
            <View>
            <Text style={styles.opcionTitulo}>Idioma: Inglés</Text>
            <Text style={styles.opcionSub}>Cambiar idioma de la app</Text>
            </View>
            <Switch
            value={ingles}
            onValueChange={setIngles}
            trackColor={{ false: "#d1d5db", true: "#111827" }}
            thumbColor={ingles ? "#fff" : "#9ca3af"}
            />
        </View>
        </View>

        <View style={styles.card}>
        <Text style={styles.seccion}>Cuenta</Text>
        <Pressable style={styles.filaBoton}>
            <Text style={styles.opcionTitulo}>🔒 Cambiar contraseña</Text>
            <Text style={styles.flecha}>›</Text>
        </Pressable>
        <View style={styles.divisor} />
        <Pressable style={styles.filaBoton}>
            <Text style={styles.opcionTitulo}>🗑️ Eliminar cuenta</Text>
            <Text style={styles.flecha}>›</Text>
        </Pressable>
        </View>

        <Pressable style={styles.botonVolver} onPress={() => router.back()}>
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
    paddingTop: 50,
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
    padding: 18,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    },
    seccion: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 14,
    },
    fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    },
    filaBoton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    },
    opcionTitulo: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
    },
    opcionSub: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2,
    },
    flecha: {
    fontSize: 22,
    color: "#9ca3af",
    },
    divisor: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginVertical: 6,
    },
    botonVolver: {
    backgroundColor: "#111827",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
    },
    botonTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    },
});
