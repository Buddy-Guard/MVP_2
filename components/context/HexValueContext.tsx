// context/MiContexto.js
import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const MiContexto = createContext(0);

// Crear un proveedor del contexto
export const MiProveedor = ({ children }: { children: React.ReactNode }) => {
  const [miValor, setMiValor] = useState(0);

  // El valor que quieres que esté disponible globalmente
  const value = {
    miValor,
    setMiValor,
  };

  return <MiContexto.Provider value={value as any}>{children}</MiContexto.Provider>;
};

// Hook personalizado para usar el contexto
export const useMiContexto = () => useContext(MiContexto);
