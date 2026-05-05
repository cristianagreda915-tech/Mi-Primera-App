import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";

// Tipado para los datos del estudiante
interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  programa: string;
  semestre: number;
  ciudad: string;
  correo: string;
  created_at?: string;
}

// Componente de menú separado con memo para evitar re-renders
const MenuNavegacion = React.memo(({ router }: { router: any }) => (
  <View style={styles.menuContainer}>
    <Pressable
      style={({ pressed }) => [
        styles.menuBoton,
        pressed && styles.menuBotonPressed,
      ]}
      onPress={() => router.push("/")}
    >
      <Text style={styles.menuTexto}>📝 Formulario</Text>
    </Pressable>

    <Pressable
      style={({ pressed }) => [
        styles.menuBoton,
        styles.menuBotonActivo,
        pressed && styles.menuBotonPressed,
      ]}
      onPress={() => router.push("/lista")}
    >
      <Text style={styles.menuTexto}>📋 Lista</Text>
    </Pressable>
  </View>
));

// Componente de tarjeta de estudiante
const TarjetaEstudiante = React.memo(({ estudiante }: { estudiante: Estudiante }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.nombre}>
        {estudiante.nombre} {estudiante.apellido}
      </Text>
      <View style={styles.semestreBadge}>
        <Text style={styles.semestreBadgeText}>
          {estudiante.semestre}° Semestre
        </Text>
      </View>
    </View>

    <View style={styles.infoContainer}>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>🎓 Programa:</Text>
        <Text style={styles.infoValue}>{estudiante.programa}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>📍 Ciudad:</Text>
        <Text style={styles.infoValue}>{estudiante.ciudad}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>📧 Correo:</Text>
        <Text style={styles.infoValue}>{estudiante.correo}</Text>
      </View>
    </View>
  </View>
));

// Componente de estado vacío
const ListaVacia = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyIcon}>📭</Text>
    <Text style={styles.emptyText}>No hay estudiantes registrados</Text>
    <Text style={styles.emptySubtext}>
      Presiona "Formulario" para agregar un nuevo estudiante
    </Text>
  </View>
);

// Componente principal
export default function Lista() {
  const router = useRouter();
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargarDatos = useCallback(async (mostrarCargaInicial = true) => {
    if (mostrarCargaInicial) {
      setCargando(true);
    }
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from("estudiantes")
        .select("*")
        .order("created_at", { ascending: false })
        .order("id", { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      setEstudiantes(data || []);
    } catch (err: any) {
      console.error("Error al cargar datos:", err);
      setError(err.message || "Error al cargar los estudiantes");
      Alert.alert(
        "Error",
        "No se pudieron cargar los estudiantes. Verifica tu conexión."
      );
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const onRefresh = useCallback(() => {
    setRefrescando(true);
    cargarDatos(false);
  }, [cargarDatos]);

  const handleEliminarTodo = useCallback(() => {
    Alert.alert(
      "Eliminar todos",
      "¿Estás seguro de que deseas eliminar todos los estudiantes?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const { error } = await supabase
                .from("estudiantes")
                .delete()
                .neq("id", 0);
              
              if (error) throw error;
              
              await cargarDatos(false);
              Alert.alert("Éxito", "Todos los estudiantes fueron eliminados");
            } catch (err: any) {
              Alert.alert("Error", err.message);
            }
          },
        },
      ]
    );
  }, [cargarDatos]);

  // Renderizado condicional
  if (cargando) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <MenuNavegacion router={router} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#111827" />
          <Text style={styles.cargandoTexto}>Cargando estudiantes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <MenuNavegacion router={router} />

      <View style={styles.headerContainer}>
        <Text style={styles.titulo}>
          Lista de Estudiantes
          {estudiantes.length > 0 && (
            <Text style={styles.contador}> ({estudiantes.length})</Text>
          )}
        </Text>
        
        {estudiantes.length > 0 && (
          <Pressable onPress={handleEliminarTodo} style={styles.botonEliminar}>
            <Text style={styles.botonEliminarTexto}>🗑️ Eliminar todos</Text>
          </Pressable>
        )}
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTexto}>⚠️ {error}</Text>
          <Pressable onPress={() => cargarDatos(false)} style={styles.botonReintentar}>
            <Text style={styles.botonReintentarTexto}>Reintentar</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={estudiantes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TarjetaEstudiante estudiante={item} />}
        ListEmptyComponent={ListaVacia}
        refreshControl={
          <RefreshControl
            refreshing={refrescando}
            onRefresh={onRefresh}
            colors={["#111827"]}
            tintColor="#111827"
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={estudiantes.length === 0 && styles.emptyListContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 12,
    backgroundColor: "#f3f4f6",
  },
  menuBoton: {
    flex: 1,
    backgroundColor: "#111827",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuBotonActivo: {
    backgroundColor: "#374151",
  },
  menuBotonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  menuTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  contador: {
    fontSize: 18,
    fontWeight: "500",
    color: "#6b7280",
  },
  botonEliminar: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  botonEliminarTexto: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cargandoTexto: {
    marginTop: 12,
    fontSize: 16,
    color: "#6b7280",
  },
  errorContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#fee2e2",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ef4444",
    alignItems: "center",
  },
  errorTexto: {
    color: "#dc2626",
    fontSize: 14,
    marginBottom: 10,
  },
  botonReintentar: {
    backgroundColor: "#dc2626",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  botonReintentarTexto: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingBottom: 8,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    flex: 1,
  },
  semestreBadge: {
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  semestreBadgeText: {
    color: "#4338ca",
    fontSize: 12,
    fontWeight: "600",
  },
  infoContainer: {
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});