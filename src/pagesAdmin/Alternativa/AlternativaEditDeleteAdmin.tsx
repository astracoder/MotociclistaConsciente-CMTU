import React, { useState } from 'react';  // Importação do React e do hook useState
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';  // Importação dos componentes do React Native
import axios from 'axios';  // Importação do axios para fazer requisições HTTP
import Global from '../../stylesAdmin/Global/globalStyles';  // Importação dos estilos globais definidos para a aplicação
import { useNavigation, useRoute } from '@react-navigation/native';  // Importação dos hooks para navegação e acesso à rota
import { NativeStackNavigationProp } from '@react-navigation/native-stack';  // Tipagem para navegação com stack
import { StackParamList } from '../../../App';  // Importação dos tipos de navegação definidos no App.tsx

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

// Tipagem para o parâmetro de navegação para garantir que a navegação esteja correta para a tela 'UsuarioAddAdmin'
type NavigationProps = NativeStackNavigationProp<StackParamList, 'UsuarioAddAdmin'>;

// Componente principal da tela para editar e desativar/ativar alternativas
export const AlternativaEditDeleteAdmin = () => {
  const navigation = useNavigation<NavigationProps>();  // Hook de navegação para navegar entre as telas
  const route = useRoute();  // Hook para acessar os parâmetros passados para a rota

  // Desestruturação dos parâmetros passados para a rota, que contêm os dados da alternativa
  const { id, status, texto: textoInicial} = route.params as {
    id: number;
    status: number;
    texto: string;
  };

  // Estado para armazenar o texto da alternativa, inicializado com o valor passado pela rota
  const [texto, setTexto] = useState(textoInicial);

  // Função para salvar as alterações da alternativa
  const handleSalvar = async () => {
    if (!texto) {  // Verifica se o campo de texto está vazio
      Alert.alert('O campo de texto está vazio!');  // Exibe um alerta caso o campo esteja vazio
      return;
    }

    try {
      // Requisição POST para editar a alternativa na API
      const response = await axios.post(`http://${ipconfig}:3000/alternativa/editarAlternativa`, {id, texto});
  
      if (response.status === 200) {  // Se a resposta da API for 200 (sucesso)
        navigation.navigate('AlternativaAdmin');  // Navega de volta para a tela de listagem de alternativas
        alert(`Os dados foram alterados com sucesso!`);  // Exibe um alerta de sucesso
      }
    } catch(err) {  // Em caso de erro na requisição
      alert("Não foi possível alterar os dados! Consulte o administrador.");
      return;
    }
  };

  // Função para ativar a alternativa
  const handleAtivar = async () => {
    try {
      // Requisição PUT para ativar a alternativa na API
      const response = await axios.put(`http://${ipconfig}:3000/alternativa/ativarAlternativa`, {id});

      if (response.status === 200) {  // Se a resposta da API for 200 (sucesso)
        navigation.navigate('AlternativaAdmin');  // Navega de volta para a tela de listagem de alternativas
        alert(`Alternativa ativada com sucesso!`);  // Exibe um alerta de sucesso
      }
    } catch(err) {  // Em caso de erro na requisição
      alert("Não foi possível ativar a alternativa! Consulte o administrador.");
    }
  };

  // Função para desativar a alternativa
  const handleDesativar = async () => {
    try {
      // Requisição PUT para desativar a alternativa na API
      const response = await axios.put(`http://${ipconfig}:3000/alternativa/desativarAlternativa`, {id});

      if (response.status === 200) {  // Se a resposta da API for 200 (sucesso)
        navigation.navigate('AlternativaAdmin');  // Navega de volta para a tela de listagem de alternativas
        alert(`Alternativa desativada com sucesso!`);  // Exibe um alerta de sucesso
      }
    } catch(err) {  // Em caso de erro na requisição
      alert("Não foi possível desativar a alternativa! Consulte o administrador.");
    }
  };

  return (
    <SafeAreaView style={Global.container}>
      <View style={Global.content}> 
        <TouchableOpacity onPress={() => navigation.goBack()} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text> 
        </TouchableOpacity>

        <View style={Global.containerAba}> 
          <Text style={Global.nomeAba}>INFORMAÇÕES DA ALTERNATIVA</Text> 
        </View>
      </View>

      <View style={Global.containerForm}> 
        <Text style={Global.label}>Edite a alternativa:</Text> 
        
        <TextInput
          style={Global.input}  // Estilo do campo de entrada
          placeholder="Nome"  // Texto de dica para o campo
          value={texto}  // O valor do campo é o estado 'texto'
          onChangeText={setTexto}  // Atualiza o estado 'texto' quando o texto mudar
        />

        <TouchableOpacity onPress={() => handleSalvar()} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Salvar alterações</Text>
        </TouchableOpacity>

        {status === 1 ? (  // Se a alternativa estiver ativa (status 1)
          <TouchableOpacity onPress={handleDesativar} style={Global.deletar}>
            <Text style={Global.botaoTexto}>Desativar</Text>
          </TouchableOpacity>
        ) : (  // Se a alternativa estiver desativada (status 0)
          <TouchableOpacity onPress={handleAtivar} style={Global.ativar}>
            <Text style={Global.botaoTexto}>Ativar</Text> 
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
