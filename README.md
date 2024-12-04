
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
- **Node.js (v20.x)**
- **npm** instalado

### **Passo a Passo**

1. Clone o repositório na sua máquina:
```bash
https://github.com/astracoder/MotociclistaConsciente-CMTU
```

2. Acesse o diretório do projeto:
```bash
cd MotociclistaConsciente-CMTU
```

3. Instale as dependências:
```bash
npm install
```

4. Execute o projeto:
```bash
npm start
```

## **Conexão com API**
As requisições à API são feitas utilizando Axios.

### **Configuração:**

```bash
import axios from 'axios';
export const api = axios.create({
  baseURL: '', 
});
```

### **Exemplo de Requisição:**

```bash
import { api } from './services/api';
export const fetchRules = async () => {
  const response = await api.get('/rules');
  return response.data;
};
```

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

## **Estrutura de pastas**
```bash
MotociclistaConsciente-CMTU/
├──📂 src/
    		├──📂 Context/
			├──UserContext.js
		├──📂Data Science
			├──acertos.py
			├──conseguiu certificado.py
			├──erros.py
			├──media notas.py
			├──modulos_iniciados.py
    		├──📂 Pages/
			├──📂 Cadastro
				├──Cadastro.tsx
			├──📂 Certificados
				├──Certificados.tsx
			├──📂 Configurações
				├──Configuracoes.tsx
			├──📂 Login
				├──Login.tsx
			├──📂 Menu
				├──Menu.tsx
			├──📂 Modulos
				├──Modulos.tsx
			├──📂 Perfil
				├──Perfil.tsx
			├──📂 Perguntas
				├──Perguntas.tsx
			├──📂 Pontuação
				├──Pontuacao.tsx
			├──📂 Reset
				├──Reset.tsx
    		├──📂 assets/
			├──cmtu_logo.png
			├──create_account.png
			├──create_account_2.png
			├──favicon.png
			├──login_account.png
			├──login_account_2.png
			├──moto_consciente.png
			├──moto_consciente_red.png
    		├──📂 pagesAdmin/
			├──📂 Alternativa
				├──AlternativaAddAdmin.tsx
				├──AlternativaAdmin.tsx
				├──AlternativaEditDeleteAdmin.tsx
			├──📂 Atividade
				├──AtividadeAddAdmin.tsx
				├──AtividadeAdmin.tsx
				├──AtividadeEditDeleteAdmin.tsx
			├──📂 Certificado
				├──CertificadoAdmin.tsx
			├──📂 Modulo
				├──ModuloAddAdmin.tsx
				├──ModuloAdmin.tsx
				├──ModuloEditDeleteAdmin.tsx
			├──📂 Usuário
				├──UsuarioAddAdmin.tsx
				├──UsuarioAdmin.tsx
				├──UsuarioEditDeleteAdmin.tsx
			├──📂 UsuarioModulo
				├──UsuarioModuloAdmin.tsx
    		├──📂 styles/
			├──📂 Cadastro
				├──CadastroStyles.ts
			├──📂 Certificados
				├──CertificadosStyles.ts
			├──📂 Configurações
				├──ConfiguracoesStyles.ts
			├──📂 Login
				├──LoginStyles.ts
			├──📂 Menu
				├──MenuStyles.ts
			├──📂 Modulos
				├──ModulosStyles.s
			├──📂 Perfil
				├──PerfilStyles.ts
			├──📂 Perguntas
				├──PerguntaStyles.ts
			├──📂 Pontuacao
				├──PontuacaoStyles.ts
			├──📂 Reset
				├──ResetStyles.ts
    		├──📂 stylesAdmin/Global
			├─globalStyles.ts
├── .gitignore
├── App.tsx
├── README.md
├── app.json
├── babel.config.js
├── codesql.sql
├── package-lock.json
├── package.json
├── tsconfig.json
	
