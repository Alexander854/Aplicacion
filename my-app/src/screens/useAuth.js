import React from 'react';
import { useAuth } from './../components/UserContext';  // Asegúrate de importar correctamente el contexto

export function Logout() {
  const { logout, deleteAccount } = useAuth();  // Usamos la función deleteAccount en lugar de deleteUserAccount

  const handleLogout = async () => {
    try {
      await logout();  // Usamos la función logout del contexto
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();  // Usamos la función deleteAccount del contexto
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <button onClick={handleDeleteAccount}>Eliminar cuenta</button>
    </div>
  );
}
