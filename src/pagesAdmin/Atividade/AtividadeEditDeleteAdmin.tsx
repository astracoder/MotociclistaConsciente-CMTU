import React, { useState } from 'react';  // Importa React e o hook useState para gerenciar o estado
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';  // Importa os componentes necessários do React Native
import axios from 'axios';  // Importa a biblioteca axios para fazer requisições HTTP
import Global from '../../stylesAdmin/Global/globalStyles';  // Importa os estilos globais
import { useNavigation, useRoute } from '@react-navigation/native';  // Importa hooks para navegação
import { NativeStackNavigationProp } from '@react-navigation/native-stack';  // Importa a tipagem de navegação de pilha
import { StackParamList } from '../../../App';  // Importa o tipo de lista de parâmetros de navegação

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

// Tipagem para navegação para a tela 'UsuarioAddAdmin'
type NavigationProps = NativeStackNavigationProp<StackParamList, 'UsuarioAddAdmin'>;

export const AtividadeEditDeleteAdmin = () => {
  // Inicializa o hook de navegação e o hook de rota
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  
  // Extrai os parâmetros da rota (id, status e texto) e define um valor inicial para 'texto'
  const { id, status, texto: textoInicial} = route.params as {
    id: number;
    status: number;
    texto: string;
  };

  // Cria um estado local 'texto' para armazenar o valor da atividade
  const [texto, setTexto] = useState(textoInicial);

  // Função para salvar as alterações feitas na atividade
  const handleSalvar = async () => {
    if (!texto) {  // Verifica se o campo de texto está vazio
      Alert.alert('O campo de texto está vazio!');  // Exibe um alerta
      return;  // Retorna sem fazer nada
    }

    try {
        // Faz a requisição POST para editar a atividade no backend
        const response = await axios.put(`http://${ipconfig}:3000/atividade/editarAtividade`, {id, texto});
  
        // Se a resposta for bem-sucedida, navega para a tela de administração de atividades
        if (response.status === 200) {
          navigation.navigate('AtividadeAdmin');
          Alert.alert('Os dados foram alterados com sucesso!');  // Usando Alert.alert() corretamente
        }
      } catch(err) {
        Alert.alert("Não foi possível alterar os dados! Consulte o administrador.");  // Exibe uma mensagem de erro
        return;
      }
  };

  // Função para ativar a atividade
  const handleAtivar = async () => {
    try {
      // Faz a requisição PUT para ativar a atividade no backend
      const response = await axios.put(`http://${ipconfig}:3000/atividade/ativarAtividade`, {id});

      // Se a resposta for bem-sucedida, navega para a tela de administração de atividades
      if (response.status === 200) {
        navigation.navigate('AtividadeAdmin');
        Alert.alert('Atividade ativada com sucesso!');  // Usando Alert.alert() corretamente
      }
    } catch(err) {
      Alert.alert("Não foi possível ativar a atividade! Consulte o administrador.");  // Exibe uma mensagem de erro
    }
  }

  // Função para desativar a atividade
  const handleDesativar = async () => {
    try {
      // Faz a requisição PUT para desativar a atividade no backend
      const response = await axios.put(`http://${ipconfig}:3000/atividade/desativarAtividade`, {id});

      // Se a resposta for bem-sucedida, navega para a tela de administração de atividades
      if (response.status === 200) {
        navigation.navigate('AtividadeAdmin');
        Alert.alert('Atividade desativada com sucesso!');  // Usando Alert.alert() corretamente
      }
    } catch(err) {
      Alert.alert("Não foi possível desativar a atividade! Consulte o administrador.");  // Exibe uma mensagem de erro
    }
  };

  return (
    // SafeAreaView é usado para garantir que o conteúdo seja exibido dentro da área segura da tela
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'↞'}</Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>INFORMAÇÕES DA ATIVIDADE</Text>  
        </View>
      </View>

      <View style={Global.containerForm}>
        <Text style={Global.label}>Edite a atividade:</Text>  
        <TextInput
          style={Global.input}  // Estilo do campo de entrada
          value={texto}  // Define o valor do campo como o estado 'texto'
          onChangeText={setTexto}  // Atualiza o estado 'texto' sempre que o valor do campo mudar
        />
        <TouchableOpacity onPress={handleSalvar} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Salvar alterações</Text>
        </TouchableOpacity>

        {status === 1 ? (
          // Se a atividade estiver ativa, exibe o botão para desativar
          <TouchableOpacity onPress={handleDesativar} style={Global.deletar}>
            <Text style={Global.botaoTexto}>Desativar</Text>
          </TouchableOpacity>
        ) : (
          // Se a atividade estiver inativa, exibe o botão para ativar
          <TouchableOpacity onPress={handleAtivar} style={Global.ativar}>
            <Text style={Global.botaoTexto}>Ativar</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
