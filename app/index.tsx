import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

//COMPONENTES REUTILIZAIBLES
function TarjetaPerfil(props) {
  return (
    <View style={styles.card}>
      <Text>{props.nombre}</Text>
      <Text>{props.ciudad}</Text>
      <Text>{props.programa}</Text>
    </View>
  );
}

export default function Home() {
  const router = useRouter();
  const [estado, setEstado] = useState("Disponible");

  const cambiarEstado = () => {
    setEstado((prev) =>
      prev === "Disponible" ? "No Disponible" : "Disponible",
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Perfil Académico</Text>

      <TarjetaPerfil
        nombre="Andrea Benavides"
        ciudad="Ciudad: Pasto"
        programa="Ingeniería de Sistemas"
      />

      <Text style={styles.estado}>Estado actual: {estado}</Text>

      <Pressable style={styles.botonSecundario} onPress={cambiarEstado}>
        <Text style={styles.botonTexto}>Cambiar estado</Text>
      </Pressable>

      {/* Navegación a Detalle */}
      <Pressable
        style={styles.botonPrincipal}
        onPress={() =>
          router.push({
            pathname: "/detalle",
            params: {
              nombre: "Cristhian - Jonathan",
              ciudad: "Pasto",
              programa: "Ingeniería de Sistemas",
              estado: estado,
            },
          })
        }
      >
        <Text style={styles.botonTexto}>Ir a Detalle</Text>
      </Pressable>

      {/* Navegación a Historial Académico */}
      <Pressable
        style={styles.botonHistorial}
        onPress={() => router.push("/historial")}
      >
        <Text style={styles.botonTexto}>📋 Historial Académico</Text>
      </Pressable>

      {/* Navegación a Configuración */}
      <Pressable
        style={styles.botonConfiguracion}
        onPress={() => router.push("/configuracion")}
      >
        <Text style={styles.botonTexto}>⚙️ Configuración</Text>
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
    padding: 18,
    marginBottom: 20,
    elevation: 4,
  },

  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },

  info: {
    fontSize: 15,
    color: "#4b5563",
    marginBottom: 4,
  },

  estado: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 15,
    textAlign: "center",
  },

  botonPrincipal: {
    backgroundColor: "#111827",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  botonSecundario: {
    backgroundColor: "#6b7280",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },

  botonHistorial: {
    backgroundColor: "#1d4ed8",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  botonContacto: {
    backgroundColor: "#0077b5",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  botonConfiguracion: {
    backgroundColor: "#6b7280",
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

/*
import { useRoute } from "@react-navigation/native";
import React, {useState} from "react";
import {View, Text, Pressable, StyleSheet} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

//COMPONENTS REUTILIZAVEIS
function TarjetaPerfil(props) {
  return (
    <View style={Styles.card}>
      <Text style={Styles.nombre}>Nombre: {props.nombre} </Text>
      <Text style={Styles.info}>Ciudad:  {props.ciudad} </Text>
      <Text style={Styles.info}>Programa: {props.programa} </Text>
    </View>
  );
}

//SCREEN 1
function InicioScreen({navigation}) {
  const [estado, setEstado] = useState ("Disponible");
  const cambiarEstado = () => {
    setEstado((prev) => prev === "Disponible" ? "No Disponible" : "Disponible");
  };
  return (
    <View style={Styles.container}>
      <Text style={Styles.titulo}>Perfil Académico</Text>

      <TarjetaPerfil
        nombre="Andrea Benavides"
        ciudad="Pasto"
        programa="Ingeniería de Sistemas"
      />

      <Text style={Styles.estado}>Estado actual: {estado}</Text>

      <Pressable style={Styles.botonSecundario} onPress={cambiarEstado}>
        <Text style={Styles.botonTexto}>Cambiar estado</Text>
      </Pressable>

      <Pressable
        style={Styles.botonPrincipal}
        onPress={() =>
          navigation.navigate("Detalle", {
            nombre: "Andrea Benavides",
            ciudad: "Pasto",
            programa: "Ingeniería de Sistemas",
            estado: estado,
          })
        }
      >
        <Text style={Styles.botonTexto}>Ver detalle</Text>
      </Pressable>
    </View>
  );
}

//SCREEN 2
function DetalleScreen({route, navigation}) {
  const {nombre, ciudad, programa, estado} = route.params;
  return (
    <View style={Styles.container}>
      <Text style={Styles.nombre}>Nombre: {nombre}</Text>
      <Text style={Styles.info}>Ciudad: {ciudad}</Text>
      <Text style={Styles.info}>Programa: {programa}</Text>

      <TarjetaPerfil
        nombre={nombre}
        ciudad={ciudad}
        programa={programa}a
      />

      <Text style={Styles.estado}>Estado: {estado}</Text>
    </View>
  );
}

const Styles = StyleSheet.create(
  {
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
    padding: 18,
    marginBottom: 20,
    elevation: 4,
  },

  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },

  info: {
    fontSize: 15,
    color: "#4b5563",
    marginBottom: 4,
  },

  estado: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 15,
    textAlign: "center",
  },

  botonPrincipal: {
    backgroundColor: "#111827",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  botonSecundario: {
    backgroundColor: "#6b7280",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },

  botonTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  }
  
);

*/
