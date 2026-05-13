import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#111827",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: "#f3f4f6",
        },
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="index"
        options={{
          title: "Inicio",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="formulario"
        options={{
          title: "Registro de Estudiante",
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="lista"
        options={{
          title: "Lista de Estudiantes",
        }}
      />

      <Stack.Screen
        name="detalle"
        options={{
          title: "Detalle del Registro",
        }}
      />

      {/* NUEVAS PANTALLAS */}
      <Stack.Screen
        name="api"
        options={{
          title: "Usuarios API",
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="usuarioDetalle"
        options={{
          title: "Detalle Usuario",
          headerShown: true,
        }}
      />
    </Stack>
  );
}