// Importação das dependências necessárias para o componente.
import React, { useState } from 'react'; // Importa o React e useState para gerenciar o estado.
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native'; // Importa componentes necessários do React Native.
import axios from 'axios'; // Importa axios para fazer requisições HTTP.
import Global from '../../stylesAdmin/Global/globalStyles'; // Importa os estilos globais do projeto.
import { useNavigation, useRoute } from '@react-navigation/native'; // Hooks para navegação e acesso aos parâmetros da rota.
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Tipagem para navegação com a stack.
import { StackParamList } from '../../../App'; // Tipo de lista de parâmetros das telas da aplicação.

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'UsuarioAddAdmin'>; // Tipagem para navegação com a tela 'UsuarioAddAdmin'.

// Componente principal para editar ou desativar um usuário.
export const UsuarioEditDeleteAdmin = () => {
  const navigation = useNavigation<NavigationProps>(); // Hook de navegação.
  const route = useRoute(); // Hook para acessar os parâmetros da rota.

  // Extrai os parâmetros da rota passados pela tela anterior (id, status, nome e email do usuário).
  const { id, status, nome: nomeInicial, email: emailInicial } = route.params as {
    id: number;
    status: number;
    nome: string;
    email: string;
  };

  // Estados locais para armazenar o nome e email do usuário, com valores iniciais passados pela rota.
  const [nome, setNome] = useState(nomeInicial);
  const [email, setEmail] = useState(emailInicial);

  // Função que lida com a atualização do nome e email do usuário.
  const handleSalvar = async () => {
    // Verifica se todos os campos estão preenchidos.
    if (!nome || !email) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!'); // Exibe um alerta se os campos estiverem vazios.
      return;
    }

    try {
      // Envia uma requisição POST para atualizar o nome e o email do usuário.
      const response = await axios.post(`http://${ipconfig}:3000/usuario/editarNomeEmail`, { id, nome, email });

      // Verifica se a resposta foi bem-sucedida (status 200).
      if (response.status === 200) {
        navigation.navigate('UsuarioAdmin'); // Navega de volta para a tela de administração de usuários.
        alert(`Os dados foram alterados com sucesso!`); // Exibe um alerta informando que as alterações foram salvas.
      }
    } catch (err) {
      // Caso ocorra um erro durante a requisição, exibe uma mensagem de erro.
      alert("Não foi possível alterar os dados! Consulte o administrador.");
      return;
    }
  };

  // Função que lida com a ativação de um usuário (quando o status é inativo).
  const handleAtivar = async () => {
    try {
      // Envia uma requisição PUT para ativar o usuário, passando o email.
      const response = await axios.put(`http://${ipconfig}:3000/usuario/ativarUsuario`, { email });

      // Verifica se a resposta foi bem-sucedida (status 200).
      if (response.status === 200) {
        navigation.navigate('UsuarioAdmin'); // Navega para a tela de administração de usuários.
        alert(`Usuário ativado com sucesso!`); // Exibe um alerta informando que o usuário foi ativado.
      }
    } catch (err) {
      // Caso ocorra um erro durante a requisição, exibe uma mensagem de erro.
      alert("Não foi possível ativiar o usuário! Consulte o administrador.");
    }
  };

  // Função que lida com a desativação de um usuário (quando o status é ativo).
  const handleDesativar = async () => {
    try {
      // Envia uma requisição PUT para desativar o usuário, passando o email.
      const response = await axios.put(`http://${ipconfig}:3000/usuario/desativarUsuario`, { email });

      // Verifica se a resposta foi bem-sucedida (status 200).
      if (response.status === 200) {
        navigation.navigate('UsuarioAdmin'); // Navega para a tela de administração de usuários.
        alert(`Usuário desativado com sucesso!`); // Exibe um alerta informando que o usuário foi desativado.
      }
    } catch (err) {
      // Caso ocorra um erro durante a requisição, exibe uma mensagem de erro.
      alert("Não foi possível deletar usuário! Consulte o administrador.");
    }
  };

  return (
    // SafeAreaView para garantir que o conteúdo será exibido dentro da área segura, evitando sobreposição de elementos em dispositivos com notch.
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        {/* Botão de voltar que navega para a tela anterior */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text>
        </TouchableOpacity>

        {/* Cabeçalho da tela */}
        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>INFORMAÇÕES DO USUÁRIO</Text>
        </View>
      </View>

      {/* Formulário para editar o nome e o e-mail do usuário */}
      <View style={Global.containerForm}>
        <Text style={Global.label}>Edite o nome:</Text>
        <TextInput
          style={Global.input}
          placeholder="Nome"
          value={nome} // Exibe o nome atual do usuário
          onChangeText={setNome} // Atualiza o nome quando o usuário digita
        />

        <Text style={Global.label}>Edite o e-mail:</Text>
        <TextInput
          style={Global.input}
          placeholder="Email"
          value={email} // Exibe o e-mail atual do usuário
          onChangeText={setEmail} // Atualiza o e-mail quando o usuário digita
          keyboardType="email-address" // Exibe o teclado adequado para digitar e-mails
        />

        {/* Botão para salvar as alterações no nome e e-mail */}
        <TouchableOpacity onPress={() => handleSalvar()} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Salvar alterações</Text>
        </TouchableOpacity>

        {/* Condicional que renderiza o botão "Desativar" ou "Ativar" baseado no status do usuário */}
        {status === 1 ? (
          <TouchableOpacity onPress={handleDesativar} style={Global.deletar}>
            <Text style={Global.botaoTexto}>Desativar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleAtivar} style={Global.ativar}>
            <Text style={Global.botaoTexto}>Ativar</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
