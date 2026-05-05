import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";

// Componente de campo mejorado con validación en tiempo real
function Campo({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  keyboardType = "default",
  error,
  required = true,
  icon,
}) {
  return (
    <View style={styles.campo}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {icon && <Text style={styles.inputIcon}>{icon}</Text>}
        <TextInput
          style={[styles.input, icon && styles.inputWithIcon]}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          keyboardType={keyboardType}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

// Componente de opción de género
function OpcionGenero({ label, selected, onPress, icon }) {
  return (
    <Pressable
      style={[styles.opcionGenero, selected && styles.opcionGeneroSelected]}
      onPress={onPress}
    >
      <Text style={styles.opcionGeneroIcon}>{icon}</Text>
      <Text style={[styles.opcionGeneroText, selected && styles.opcionGeneroTextSelected]}>
        {label}
      </Text>
      {selected && <Text style={styles.checkIcon}>✓</Text>}
    </Pressable>
  );
}

export default function Formulario() {
  const router = useRouter();

  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    correo: "",
    telefono: "",
    programa: "",
    semestre: "",
    ciudad: "",
    genero: null,
    acepta: false,
  });

  // Estados de errores
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const [tocado, setTocado] = useState({});
  const [userId, setUserId] = useState(null);

  // Verificar sesión al cargar el componente
  useEffect(() => {
    const obtenerUsuario = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        Alert.alert("Sesión no encontrada", "Debes iniciar sesión para registrar estudiantes.");
        router.replace("/login");
      } else {
        setUserId(user.id);
      }
    };
    obtenerUsuario();
  }, []);

  // Validaciones
  const validaciones = {
    nombre: (value) => {
      if (!value) return "El nombre es obligatorio";
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/.test(value))
        return "El nombre solo debe contener letras (2-50 caracteres)";
      return null;
    },
    apellido: (value) => {
      if (!value) return "El apellido es obligatorio";
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/.test(value))
        return "El apellido solo debe contener letras (2-50 caracteres)";
      return null;
    },
    edad: (value) => {
      if (!value) return "La edad es obligatoria";
      const edadNum = Number(value);
      if (isNaN(edadNum)) return "La edad debe ser un número";
      if (edadNum < 15 || edadNum > 100) return "La edad debe estar entre 15 y 100 años";
      return null;
    },
    correo: (value) => {
      if (!value) return "El correo es obligatorio";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Ingrese un correo válido (ejemplo@dominio.com)";
      return null;
    },
    telefono: (value) => {
      if (!value) return "El teléfono es obligatorio";
      if (!/^\d{7,15}$/.test(value))
        return "El teléfono debe contener solo números (7-15 dígitos)";
      return null;
    },
    programa: (value) => {
      if (!value) return "El programa es obligatorio";
      if (value.length < 3) return "El programa debe tener al menos 3 caracteres";
      return null;
    },
    semestre: (value) => {
      if (!value) return "El semestre es obligatorio";
      const semestreNum = Number(value);
      if (isNaN(semestreNum)) return "El semestre debe ser un número";
      if (semestreNum < 1 || semestreNum > 12) return "El semestre debe estar entre 1 y 12";
      return null;
    },
    ciudad: (value) => {
      if (!value) return "La ciudad es obligatoria";
      if (value.length < 2) return "La ciudad debe tener al menos 2 caracteres";
      return null;
    },
    genero: (value) => {
      if (!value) return "Debe seleccionar un género";
      return null;
    },
    acepta: (value) => {
      if (!value) return "Debe aceptar los términos y condiciones";
      return null;
    },
  };

  // Validar un campo específico
  const validarCampo = (nombre, valor) => {
    const error = validaciones[nombre] ? validaciones[nombre](valor) : null;
    setErrores((prev) => ({ ...prev, [nombre]: error }));
    return !error;
  };

  // Validar todos los campos
  const validarFormulario = () => {
    const nuevosErrores = {};
    let esValido = true;

    Object.keys(validaciones).forEach((campo) => {
      const valor = campo === "genero" ? formData[campo] : formData[campo];
      const error = validaciones[campo](valor);
      if (error) {
        nuevosErrores[campo] = error;
        esValido = false;
      }
    });

    setErrores(nuevosErrores);
    return esValido;
  };

  // Marcar todos los campos como tocados
  const marcarTodosTocados = () => {
    const todosTocados = {};
    Object.keys(validaciones).forEach((campo) => {
      todosTocados[campo] = true;
    });
    setTocado(todosTocados);
  };

  // Actualizar campo del formulario
  const actualizarCampo = (nombre, valor) => {
    setFormData((prev) => ({ ...prev, [nombre]: valor }));
    if (tocado[nombre]) {
      validarCampo(nombre, valor);
    }
  };

  // Marcar campo como tocado al perder foco
  const handleBlur = (nombre) => {
    setTocado((prev) => ({ ...prev, [nombre]: true }));
    validarCampo(nombre, formData[nombre]);
  };

  // Guardar en Supabase
  const guardarEnSupabase = async () => {
    // Verificar que tengamos el userId
    if (!userId) {
      Alert.alert("Error", "No se pudo identificar al usuario. Inicia sesión nuevamente.");
      router.replace("/login");
      return;
    }

    marcarTodosTocados();

    if (!validarFormulario()) {
      Alert.alert(
        "Campos inválidos",
        "Por favor, corrija los errores antes de continuar.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      setCargando(true);

      const { data, error } = await supabase
        .from("estudiantes")
        .insert([
          {
            nombre: formData.nombre,
            apellido: formData.apellido,
            edad: Number(formData.edad),
            correo: formData.correo,
            telefono: formData.telefono,
            programa: formData.programa,
            semestre: Number(formData.semestre),
            ciudad: formData.ciudad,
            genero: formData.genero,
            acepta_terminos: formData.acepta,
            user_id: userId, // 👈 Se agrega el ID del usuario autenticado
          },
        ])
        .select();

      if (error) {
        console.error("Error Supabase:", error);

        if (error.code === "23505") {
          Alert.alert("Error", "Ya existe un estudiante con este correo");
        } else if (error.code === "42501") {
          Alert.alert(
            "Error de permisos",
            "No tienes permisos para insertar. Verifica las políticas RLS en Supabase o contacta al administrador."
          );
        } else {
          Alert.alert("Error", error.message || "Error al guardar los datos");
        }
        return;
      }

      const estudiante = data?.[0];

      // Resetear formulario
      setFormData({
        nombre: "",
        apellido: "",
        edad: "",
        correo: "",
        telefono: "",
        programa: "",
        semestre: "",
        ciudad: "",
        genero: null,
        acepta: false,
      });
      setTocado({});
      setErrores({});

      Alert.alert(
        "¡Éxito!",
        "Estudiante registrado correctamente",
        [
          {
            text: "Ver Lista",
            onPress: () => router.push("/lista"),
          },
          {
            text: "Registrar Otro",
            style: "cancel",
          },
        ]
      );
    } catch (error) {
      console.error("Error inesperado:", error);
      Alert.alert("Error", "Ocurrió un error inesperado. Intente de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.titulo}>Registro de Estudiante</Text>
            <Text style={styles.subtitulo}>Complete todos los campos</Text>
          </View>

          <View style={styles.card}>
            <Campo
              label="Nombre"
              value={formData.nombre}
              onChangeText={(text) => actualizarCampo("nombre", text)}
              onBlur={() => handleBlur("nombre")}
              placeholder="Ej: Andrea"
              error={tocado.nombre && errores.nombre}
              icon="👤"
            />

            <Campo
              label="Apellido"
              value={formData.apellido}
              onChangeText={(text) => actualizarCampo("apellido", text)}
              onBlur={() => handleBlur("apellido")}
              placeholder="Ej: Benavides"
              error={tocado.apellido && errores.apellido}
              icon="👤"
            />

            <Campo
              label="Edad"
              value={formData.edad}
              onChangeText={(text) => actualizarCampo("edad", text)}
              onBlur={() => handleBlur("edad")}
              placeholder="Ej: 21"
              keyboardType="numeric"
              error={tocado.edad && errores.edad}
              icon="🎂"
            />

            <Campo
              label="Correo"
              value={formData.correo}
              onChangeText={(text) => actualizarCampo("correo", text)}
              onBlur={() => handleBlur("correo")}
              placeholder="Ej: correo@dominio.com"
              keyboardType="email-address"
              error={tocado.correo && errores.correo}
              icon="📧"
            />

            <Campo
              label="Teléfono"
              value={formData.telefono}
              onChangeText={(text) => actualizarCampo("telefono", text)}
              onBlur={() => handleBlur("telefono")}
              placeholder="Ej: 3001234567"
              keyboardType="numeric"
              error={tocado.telefono && errores.telefono}
              icon="📱"
            />

            <Campo
              label="Programa"
              value={formData.programa}
              onChangeText={(text) => actualizarCampo("programa", text)}
              onBlur={() => handleBlur("programa")}
              placeholder="Ej: Ingeniería de Sistemas"
              error={tocado.programa && errores.programa}
              icon="🎓"
            />

            <Campo
              label="Semestre"
              value={formData.semestre}
              onChangeText={(text) => actualizarCampo("semestre", text)}
              onBlur={() => handleBlur("semestre")}
              placeholder="Ej: 6"
              keyboardType="numeric"
              error={tocado.semestre && errores.semestre}
              icon="📚"
            />

            <Campo
              label="Ciudad"
              value={formData.ciudad}
              onChangeText={(text) => actualizarCampo("ciudad", text)}
              onBlur={() => handleBlur("ciudad")}
              placeholder="Ej: Pasto"
              error={tocado.ciudad && errores.ciudad}
              icon="📍"
            />

            <Text style={styles.label}>
              Género <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.generoContainer}>
              <OpcionGenero
                label="Masculino"
                selected={formData.genero === "Masculino"}
                onPress={() => {
                  actualizarCampo("genero", "Masculino");
                  handleBlur("genero");
                }}
                icon="👨"
              />
              <OpcionGenero
                label="Femenino"
                selected={formData.genero === "Femenino"}
                onPress={() => {
                  actualizarCampo("genero", "Femenino");
                  handleBlur("genero");
                }}
                icon="👩"
              />
            </View>
            {tocado.genero && errores.genero && (
              <Text style={styles.errorText}>{errores.genero}</Text>
            )}

            <View style={styles.terminosContainer}>
              <Pressable
                style={styles.checkboxContainer}
                onPress={() => actualizarCampo("acepta", !formData.acepta)}
              >
                <Text style={styles.checkbox}>
                  {formData.acepta ? "☑" : "☐"}
                </Text>
                <Text style={styles.terminosTexto}>
                  Acepto los términos y condiciones
                </Text>
              </Pressable>
              {tocado.acepta && errores.acepta && (
                <Text style={styles.errorText}>{errores.acepta}</Text>
              )}
            </View>

            <Pressable
              style={[styles.boton, cargando && styles.botonDisabled]}
              onPress={guardarEnSupabase}
              disabled={cargando}
            >
              {cargando ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.botonTexto}>✅ Registrar Estudiante</Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f3f4f6",
  },
  header: {
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    textAlign: "center",
    color: "#6b7280",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  campo: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: "600",
    fontSize: 14,
    color: "#374151",
  },
  required: {
    color: "#ef4444",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    backgroundColor: "#f9fafb",
  },
  inputError: {
    borderColor: "#ef4444",
    borderWidth: 2,
  },
  inputIcon: {
    fontSize: 18,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  generoContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  opcionGenero: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 2,
    borderColor: "#d1d5db",
    borderRadius: 12,
    backgroundColor: "#f9fafb",
    gap: 8,
  },
  opcionGeneroSelected: {
    borderColor: "#4f46e5",
    backgroundColor: "#eef2ff",
  },
  opcionGeneroIcon: {
    fontSize: 20,
  },
  opcionGeneroText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  opcionGeneroTextSelected: {
    color: "#4f46e5",
    fontWeight: "bold",
  },
  checkIcon: {
    color: "#10b981",
    fontSize: 16,
    fontWeight: "bold",
  },
  terminosContainer: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    fontSize: 20,
  },
  terminosTexto: {
    fontSize: 14,
    color: "#374151",
  },
  boton: {
    backgroundColor: "#4f46e5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  botonDisabled: {
    opacity: 0.7,
  },
  botonTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});