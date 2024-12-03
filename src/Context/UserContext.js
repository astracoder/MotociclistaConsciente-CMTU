import React, { createContext, useContext, useState } from 'react';

//Instaciou o contextAPI
const UserContext = createContext();

//Cria um constante global que esta disponivel para todas as telas
export const UserProvider = ({ children }) => {

  //Cria uma useState vazia com id, nome e email
  const [user, setUser] = useState({ id_usuario: '', nome: '', email: '' });

  //Função que recebe id, nome e email do login(front) e defini os dados para o useStateUser
  const setUserData = (id_usuario, nome, email) => {
    setUser({ id_usuario, nome, email });
  };

  //Retorno de uma TAG React que contem os dados do usuario para que todas as telas usem as informações do usuario logado
  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Qualquer componente pode chamar useUser() para acessar os dados do usuário ou a função setUserData.
export const useUser = () => {
  return useContext(UserContext);
};
