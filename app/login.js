import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";

export default function Login() {
    const router = useRouter();

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [cargando, setCargando] = useState(false);

    const registrarUsuario = async () => {
    if (!correo || !password) {
        alert("Digite correo y contraseña");
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener mínimo 6 caracteres");
        return;
    }

    setCargando(true);

    const { data, error } = await supabase.auth.signUp({
        email: correo,
        password: password,
    });

    setCargando(false);

    if (error) {
        alert(error.message);
        return;
    }

    alert("Usuario registrado correctamente");
    console.log("REGISTRO:", data);
    };

    const iniciarSesion = async () => {
    if (!correo || !password) {
        alert("Digite correo y contraseña");
        return;
    }

    setCargando(true);

    const { data, error } = await supabase.auth.signInWithPassword({
        email: correo,
        password: password,
    });

    setCargando(false);

    if (error) {
        alert(error.message);
        return;
    }

    console.log("LOGIN:", data);
    router.replace("/");
    };

    return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Bienvenido</Text>
        <Text style={styles.subtitulo}>Iniciar sesión con Supabase</Text>

        <View style={styles.card}>
        <Text style={styles.label}>Correo</Text>
        <TextInput
            style={styles.input}
            placeholder="correo@dominio.com"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
            style={styles.input}
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />

        <Pressable style={styles.boton} onPress={iniciarSesion}>
            {cargando ? (
            <ActivityIndicator color="#fff" />
            ) : (
            <Text style={styles.botonTexto}>Iniciar sesión</Text>
            )}
        </Pressable>

        <Pressable style={styles.botonSecundario} onPress={registrarUsuario}>
            <Text style={styles.botonSecundarioTexto}>Registrarme</Text>
        </Pressable>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    padding: 20,
    },

    titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    },

    subtitulo: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 25,
    },

    card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 18,
    elevation: 4,
    },

    label: {
    fontWeight: "600",
    marginBottom: 6,
    color: "#111827",
    },

    input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    },

    boton: {
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
    },

    botonTexto: {
    color: "white",
    fontWeight: "bold",
    },

    botonSecundario: {
    marginTop: 12,
    alignItems: "center",
    },

    botonSecundarioTexto: {
    color: "#111827",
    fontWeight: "bold",
    },
});

