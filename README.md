
# **Motorista Consciente**

### **Status:** 🚧 Em desenvolvimento 🚧

O **Motorista Consciente** é um projeto desenvolvido por nós, alunos da **Universidade Positivo - Londrina**, com o objetivo de conscientizar os motociclistas da nossa cidade sobre boas condutas e as leis de trânsito.

---

## **Tecnologias Utilizadas**
- **React**: Biblioteca principal para a construção da interface.
- **TypeScript**: Para garantir tipagem estática e segurança no desenvolvimento.
- **Axios**: Gerenciamento de requisições HTTP.
- **React Router**: Navegação entre páginas.
- **CSS**: Personalização e estilização dos componentes.

---

## **Configuração do Ambiente**

### **Pré-requisitos**
- **Node.js**
- **npm** instalado

### **Passo a Passo**
1. Clone o repositório na sua máquina:
https://github.com/astracoder/MotociclistaConsciente-CMTU

2. Acesse o diretório do projeto:
cd motorista-consciente

3. Instale as dependências:
npm install

4. Execute o projeto:
npm start

## **Conexão com API**
As requisições à API são feitas utilizando Axios.

### **Configuração:**
import axios from 'axios';

export const api = axios.create({
  baseURL: '', 
});

### **Exemplo de Requisição:**
import { api } from './services/api';

export const fetchRules = async () => {
  const response = await api.get('/rules');
  return response.data;
};

## **Estilos**
Utilizamos CSS para personalizar os componentes e criar uma experiência visual agradável.

### **Exemplo de Estilo:**

| Propriedade       | Valor                                |
|-------------------|--------------------------------------|
| **width**         | `'100%'`                            |
| **height**        | `50`                                |
| **backgroundColor** | `'#A6CE39'`                        |
| **paddingVertical** | `15`                               |
| **borderRadius**  | `32`                                |
| **justifyContent** | `'center'`                         |
| **alignItems**    | `'center'`                          |
| **shadowColor**   | `'#171717'`                         |
| **shadowOffset**  | `{ width: 3, height: 4 }`           |
| **shadowOpacity** | `0.2`                               |
| **shadowRadius**  | `3`                                 |

| **Texto Botão**   |                                      |
|-------------------|--------------------------------------|
| **fontSize**      | `18`                                |
| **fontWeight**    | `'bold'`                            |
| **color**         | `'#fefefe'`                         |
