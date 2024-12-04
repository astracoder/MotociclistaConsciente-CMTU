// Importação de dependências necessárias para o funcionamento do componente.
import React, { useState } from 'react'; // Importa React e useState para controle de estado no componente.
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native'; // Importa componentes de UI do React Native.
import axios from 'axios'; // Importa axios para fazer requisições HTTP.
import Global from '../../stylesAdmin/Global/globalStyles'; // Importa o arquivo de estilos globais.
import { useNavigation, useRoute } from '@react-navigation/native'; // Importa hooks de navegação e de rota.
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Importa tipagem para navegação com stack.
import { StackParamList } from '../../../App'; // Importa o tipo de lista de parâmetros para navegação.

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'ModuloEditDeleteAdmin'>; // Define o tipo de navegação para esta tela.

export const ModuloEditDeleteAdmin = () => {
  // Obtém as funções de navegação e os parâmetros passados pela rota.
  const navigation = useNavigation<NavigationProps>(); 
  const route = useRoute(); 
  
  // Desestruturação dos parâmetros passados pela rota.
  const { id, status, nomeModulo: nomeModuloInicial, porcentagem: porcentagemInicial } = route.params as {
    id: number;
    status: number;
    nomeModulo: string;
    porcentagem: string;
  };

  // Definição dos estados para os campos que podem ser alterados.
  const [nome, setNome] = useState(nomeModuloInicial);
  const [porcentagem, setPorcentagem] = useState(porcentagemInicial);

  // Função para salvar as alterações no módulo.
  const handleSalvar = async () => {
    // Verifica se todos os campos estão preenchidos antes de enviar a requisição.
    if (!nome || !porcentagem) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    try {
        // Envia a requisição para editar o módulo via PUT request com os dados atualizados.
        const response = await axios.post(`http://${ipconfig}:3000/modulo/editarModulo`, {id, nome, porcentagem});
  
        // Se a resposta for bem-sucedida, navega de volta para a tela de listagem dos módulos e exibe um alerta.
        if (response.status === 200) {
          navigation.navigate('ModuloAdmin');
          alert(`Os dados foram alterados com sucesso!`);
        }
      } catch(err) {
        // Caso haja erro ao editar, exibe uma mensagem de erro.
        alert("Não foi possível alterar os dados! Consulte o administrador.");
        return;
      }
  };

  // Função para ativar o módulo.
  const handleAtivar = async () => {
    try {
      // Envia a requisição PUT para ativar o módulo.
      const response = await axios.put(`http://${ipconfig}:3000/modulo/ativarModulo`, {id});

      // Se a resposta for bem-sucedida, navega de volta e exibe um alerta de sucesso.
      if (response.status === 200) {
        navigation.navigate('ModuloAdmin');
        alert(`Módulo ativado com sucesso!`);
      }
    } catch(err) {
      // Caso haja erro ao ativar, exibe uma mensagem de erro.
      alert("Não foi possível ativar o módulo! Consulte o administrador.");
    }
  }

  // Função para desativar o módulo.
  const handleDesativar = async () => {
    try {
        // Envia a requisição PUT para desativar o módulo.
        const response = await axios.put(`http://${ipconfig}:3000/modulo/desativarModulo`, {id});

        // Se a resposta for bem-sucedida, navega de volta e exibe um alerta de sucesso.
        if (response.status === 200) {
          navigation.navigate('ModuloAdmin');
          alert(`Módulo desativado com sucesso!`);
        }
    } catch(err) {
        // Caso haja erro ao desativar, exibe uma mensagem de erro.
        alert("Não foi possível desativar o módulo! Consulte o administrador.");
    }
  };

  return (
    // Contêiner principal da tela, com SafeAreaView garantindo o layout responsivo.
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        {/* Botão de voltar que navega para a tela anterior */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'↞'}</Text>
        </TouchableOpacity>

        {/* Cabeçalho da tela */}
        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>INFORMAÇÕES DO MÓDULO</Text>
        </View>
      </View>

      {/* Formulário para editar as informações do módulo */}
      <View style={Global.containerForm}>
        {/* Campo de edição do nome do módulo */}
        <Text style={Global.label}>Edite o módulo:</Text>
        <TextInput
            style={Global.input}
            placeholder="Nome do módulo"
            value={nome}
            onChangeText={setNome}
          />

        {/* Campo de edição da porcentagem necessária */}
        <Text style={Global.label}>Edite a porcentagem do módulo:</Text>
        <TextInput
            style={Global.input}
            placeholder="Porcentagem módulo"
            value={porcentagem}
            onChangeText={setPorcentagem}
        />

        {/* Botão de salvar alterações */}
        <TouchableOpacity onPress={() => handleSalvar()} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Salvar alterações</Text>
        </TouchableOpacity>

        {/* Condicionalmente exibe os botões de ativar ou desativar com base no status */}
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
