import React, { createContext, useState, useContext } from 'react';

// Criar o contexto
const UserContext = createContext();

// Provider para fornecer os dados do usuário
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para armazenar as informações do usuário

  // Função para atualizar as informações do usuário após o login
  const setUserInfo = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acessar as informações do usuário em outros componentes
export const useUser = () => {
  return useContext(UserContext);
};
