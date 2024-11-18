import React, { useEffect } from "react";
import Routers from "./src/Router/router";
import { ThemeProvider } from "./src/config/themecontext";
import { AuthProvider, useAuth } from './src/components/UserContext';

// Componente auxiliar que obtiene el userId desde el contexto de autenticación
function AppWrapper() {
  const { user, userId } = useAuth();  // Aquí, 'userId' es el uid del usuario actual

  useEffect(() => {
    console.log("userId:", user?.uid);  // Verifica que el userId esté disponible
  }, [user]);

  return (
    <ThemeProvider userId={user?.uid}> {/* Pasa el userId al ThemeProvider */}
      <Routers />
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppWrapper />  {/* Usamos AppWrapper dentro del AuthProvider */}
    </AuthProvider>
  );
}
