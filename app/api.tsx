import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

type Usuario = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
  address: { city: string };
};

export default function ApiUsuarios() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
      const datos = await respuesta.json();
      setUsuarios(datos);
      setError("");
    } catch (e) {
      console.log(e);
      setError("No se pudieron cargar los usuarios");
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#111827" />
        <Text style={styles.loadingText}>Cargando usuarios...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Pressable style={styles.boton} onPress={cargarUsuarios}>
          <Text style={styles.botonTexto}>Intentar otra vez</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Directorio de Usuarios</Text>
      <Text style={styles.subtitulo}>Datos consumidos desde una API REST</Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/usuarioDetalle",
                params: {
                  id: item.id,
                  nombre: item.name,
                  usuario: item.username,
                  correo: item.email,
                  telefono: item.phone,
                  sitio: item.website,
                  empresa: item.company.name,
                  ciudad: item.address.city,
                },
              })
            }
          >
            <Text style={styles.nombre}>{item.name}</Text>
            <Text style={styles.info}>Correo: {item.email}</Text>
            <Text style={styles.info}>Ciudad: {item.address.city}</Text>
            <Text style={styles.info}>Empresa: {item.company.name}</Text>
            <Text style={styles.verMas}>Ver detalle →</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#f3f4f6",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginTop: 10,
  },
  subtitulo: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 18,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 6,
  },
  info: {
    color: "#4b5563",
    marginBottom: 3,
  },
  verMas: {
    marginTop: 10,
    color: "#111827",
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f3f4f6",
  },
  loadingText: {
    marginTop: 12,
    color: "#374151",
    fontWeight: "600",
  },
  error: {
    color: "#b91c1c",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  boton: {
    backgroundColor: "#111827",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  botonTexto: {
    color: "white",
    fontWeight: "bold",
  },
});