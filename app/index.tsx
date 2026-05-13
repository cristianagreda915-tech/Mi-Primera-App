import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

const { width, height } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    verificarSesion();
    obtenerUsuario();
  }, []);

  const verificarSesion = async () => {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      router.replace("/login");
    }
  };

  const obtenerUsuario = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setUserEmail(data.user.email);
    }
  };

  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      router.replace("/login");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070",
        }}
        style={styles.background}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.9)"]}
          style={styles.overlay}
        >
          <View style={styles.content}>
            {/* Info del usuario logueado */}
            {userEmail && (
              <View style={styles.userInfo}>
                <Text style={styles.userEmail}>👤 {userEmail}</Text>
              </View>
            )}

            <View style={styles.logoContainer}>
              <Text style={styles.logoIcon}>🎓</Text>
            </View>

            <Text style={styles.titulo}>Sistema de Gestión</Text>
            <Text style={styles.subtitulo}>Estudiantil</Text>

            <View style={styles.divider} />

            <Text style={styles.descripcion}>
              Registra y administra la información{"\n"}
              de tus estudiantes de manera fácil y rápida
            </Text>

            <View style={styles.botonesContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.botonPrimario,
                  pressed && styles.botonPressed,
                ]}
                onPress={() => router.push("/formulario")}
              >
                <Text style={styles.botonPrimarioTexto}>
                  📝 Registrar Estudiante
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.botonSecundario,
                  pressed && styles.botonPressed,
                ]}
                onPress={() => router.push("/lista")}
              >
                <Text style={styles.botonSecundarioTexto}>
                  📋 Ver Lista de Estudiantes
                </Text>
              </Pressable>

              {/* Botón para consumir API REST */}
              <Pressable
                style={({ pressed }) => [
                  styles.botonApi,
                  pressed && styles.botonPressed,
                ]}
                onPress={() => router.push("/api")}
              >
                <Text style={styles.botonApiTexto}>🌐 Consumir API Externa</Text>
              </Pressable>

              {/* Botón de cerrar sesión */}
              <Pressable
                style={({ pressed }) => [
                  styles.botonSalir,
                  pressed && styles.botonPressed,
                ]}
                onPress={cerrarSesion}
              >
                <Text style={styles.botonSalirTexto}>🚪 Cerrar sesión</Text>
              </Pressable>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>10+</Text>
                <Text style={styles.statLabel}>Programas</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>24/7</Text>
                <Text style={styles.statLabel}>Disponible</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>100%</Text>
                <Text style={styles.statLabel}>Seguro</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  userInfo: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  userEmail: {
    color: "white",
    fontSize: 12,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  logoIcon: {
    fontSize: 48,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "300",
    color: "white",
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: -5,
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: "#4f46e5",
    borderRadius: 2,
    marginVertical: 24,
  },
  descripcion: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  botonesContainer: {
    width: "100%",
    gap: 16,
    marginBottom: 48,
  },
  botonPrimario: {
    backgroundColor: "#4f46e5",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  botonPrimarioTexto: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  botonSecundario: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  botonSecundarioTexto: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  botonApi: {
    backgroundColor: "#059669",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  botonApiTexto: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  botonSalir: {
    backgroundColor: "#b91c1c",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
  },
  botonSalirTexto: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  botonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
});