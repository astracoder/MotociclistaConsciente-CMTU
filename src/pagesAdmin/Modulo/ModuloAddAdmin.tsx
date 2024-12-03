import React, { useState } from 'react';  // Importa React e o hook useState
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';  // Importa componentes do React Native
import axios from 'axios';  // Importa o axios para fazer requisições HTTP
import Global from '../../stylesAdmin/Global/globalStyles';  // Importa os estilos globais do projeto
import { useNavigation } from '@react-navigation/native';  // Importa o hook useNavigation para navegação
import { NativeStackNavigationProp } from '@react-navigation/native-stack';  // Importa o tipo de navegação para pilha de navegação
import { StackParamList } from '../../../App';  // Importa os tipos de parâmetros da navegação definidos no App

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

// Definição do tipo de navegação para a tela de 'ModuloAddAdmin'
type NavigationProps = NativeStackNavigationProp<StackParamList, 'ModuloAddAdmin'>;

export const ModuloAddAdmin = () => {
  // Hook para controlar a navegação entre telas
  const navigation = useNavigation<NavigationProps>();

  // Hooks para armazenar o nome e porcentagem do módulo a ser cadastrado
  const [nome, setNome] = useState('');
  const [porcentagem, setPorcentagem] = useState('');

  // Função para realizar o cadastro do módulo
  const handleCadastro = async () => {
    // Verifica se todos os campos foram preenchidos
    if (!nome || !porcentagem) {
      alert('Todos os campos são obrigatórios!');  // Exibe um alerta se algum campo estiver vazio
      return;
    }

    try {
      // Realiza a requisição POST para cadastrar o módulo
      const response = await axios.post(`http://${ipconfig}:3000/modulo/cadastro`, {nome, porcentagem});

      // Se a requisição for bem-sucedida, navega para a tela de administração de módulos
      if (response.status === 200) {
        navigation.navigate('ModuloAdmin');
        alert(`Módulo cadastrado com sucesso!`);  // Exibe um alerta de sucesso
      }
    } catch (err) {
      // Caso haja erro na requisição, exibe uma mensagem de erro
      alert("Não foi possível cadastrar o módulo! Consulte o administrador.");
      return;
    }
  };

  return (
    // SafeAreaView garante que o conteúdo não sobreponha a área de interação da tela (ex: barra de status)
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        {/* Botão de navegação para voltar para a tela anterior */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text>
        </TouchableOpacity>

        {/* Título da seção de cadastro de módulo */}
        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>CADASTRAR MÓDULOS</Text>
        </View>
      </View>

      {/* Formulário de cadastro */}
      <View style={Global.containerForm}>
        {/* Label para o campo de nome do módulo */}
        <Text style={Global.label}>Módulo:</Text>
        {/* Campo de input para o nome do módulo */}
        <TextInput
          style={Global.input}
          placeholder="Digite o nome do módulo..."
          value={nome}
          onChangeText={setNome}  // Atualiza o estado 'nome' com o texto inserido
        />

        {/* Label para o campo de porcentagem */}
        <Text style={Global.label}>Porcentagem:</Text>
        {/* Campo de input para a porcentagem */}
        <TextInput
          style={Global.input}
          placeholder="Porcentagem para passar o módulo..."
          value={porcentagem}
          onChangeText={setPorcentagem}  // Atualiza o estado 'porcentagem' com o texto inserido
        />

        {/* Botão para enviar o formulário */}
        <TouchableOpacity onPress={handleCadastro} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
