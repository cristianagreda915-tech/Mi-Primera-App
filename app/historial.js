import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const historial = [
    {
    semestre: "Semestre 1",
    promedio: "4.2",
    materias: [
        { nombre: "Cálculo I", nota: "4.5", estado: "Aprobada" },
        { nombre: "Álgebra Lineal", nota: "4.0", estado: "Aprobada" },
        { nombre: "Introducción a Programación", nota: "4.8", estado: "Aprobada" },
        { nombre: "Lógica Matemática", nota: "3.8", estado: "Aprobada" },
    ],
    },
    {
    semestre: "Semestre 2",
    promedio: "4.0",
    materias: [
        { nombre: "Cálculo II", nota: "3.9", estado: "Aprobada" },
        { nombre: "Estructuras de Datos", nota: "4.3", estado: "Aprobada" },
        { nombre: "Programación Orientada a Objetos", nota: "4.5", estado: "Aprobada" },
        { nombre: "Estadística I", nota: "3.5", estado: "Aprobada" },
    ],
    },
    {
    semestre: "Semestre 3",
    promedio: "3.7",
    materias: [
        { nombre: "Bases de Datos", nota: "4.1", estado: "Aprobada" },
        { nombre: "Sistemas Operativos", nota: "3.4", estado: "Aprobada" },
        { nombre: "Redes de Computadores", nota: "3.8", estado: "Aprobada" },
        { nombre: "Ingeniería de Software I", nota: "3.6", estado: "Aprobada" },
    ],
    },
];

function getColorNota(nota) {
    const n = parseFloat(nota);
    if (n >= 4.5) return "#10b981";
    if (n >= 3.5) return "#f59e0b";
    return "#ef4444";
}

export default function Historial() {
    const router = useRouter();

    const promedioGlobal = (
    historial.reduce((sum, s) => sum + parseFloat(s.promedio), 0) /
    historial.length
    ).toFixed(1);

    return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>📋 Historial Académico</Text>

      {/* Resumen global */}
        <View style={styles.cardResumen}>
        <View style={styles.resumenItem}>
            <Text style={styles.resumenValor}>{promedioGlobal}</Text>
            <Text style={styles.resumenLabel}>Promedio Global</Text>
        </View>
        <View style={styles.divisorVertical} />
        <View style={styles.resumenItem}>
            <Text style={styles.resumenValor}>{historial.length}</Text>
            <Text style={styles.resumenLabel}>Semestres</Text>
        </View>
        <View style={styles.divisorVertical} />
        <View style={styles.resumenItem}>
            <Text style={styles.resumenValor}>
            {historial.reduce((sum, s) => sum + s.materias.length, 0)}
            </Text>
            <Text style={styles.resumenLabel}>Materias</Text>
        </View>
      </View>

      {/* Semestres */}
      {historial.map((sem, idx) => (
        <View key={idx} style={styles.cardSemestre}>
          <View style={styles.semHeaderRow}>
            <Text style={styles.semTitulo}>{sem.semestre}</Text>
            <View style={styles.promedioBadge}>
              <Text style={styles.promedioTexto}>⭐ {sem.promedio}</Text>
            </View>
          </View>

          {sem.materias.map((mat, i) => (
            <View key={i}>
              <View style={styles.materiaFila}>
                <Text style={styles.materiaNombre}>{mat.nombre}</Text>
                <Text
                  style={[
                    styles.materiaNota,
                    { color: getColorNota(mat.nota) },
                  ]}
                >
                  {mat.nota}
                </Text>
              </View>
              {i < sem.materias.length - 1 && (
                <View style={styles.divisor} />
              )}
            </View>
          ))}
        </View>
      ))}

      <Pressable style={styles.botonVolver} onPress={() => router.back()}>
        <Text style={styles.botonTexto}>← Volver al inicio</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  container: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
  },
  cardResumen: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
  },
  resumenItem: {
    alignItems: "center",
  },
  resumenValor: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },
  resumenLabel: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 4,
  },
  divisorVertical: {
    width: 1,
    height: 40,
    backgroundColor: "#374151",
  },
  cardSemestre: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  semHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  semTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
  },
  promedioBadge: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  promedioTexto: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },
  materiaFila: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  materiaNombre: {
    fontSize: 14,
    color: "#4b5563",
    flex: 1,
  },
  materiaNota: {
    fontSize: 15,
    fontWeight: "bold",
  },
  divisor: {
    height: 1,
    backgroundColor: "#f3f4f6",
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
