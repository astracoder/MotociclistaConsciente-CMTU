import React, { useState } from 'react';  // Importa React e o hook useState para gerenciar o estado
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';  // Importa os componentes do React Native necessários
import axios from 'axios';  // Importa a biblioteca axios para realizar requisições HTTP
import Global from '../../stylesAdmin/Global/globalStyles';  // Importa os estilos globais
import { useNavigation, useRoute } from '@react-navigation/native';  // Importa hooks para navegação e para acessar os parâmetros da rota
import { NativeStackNavigationProp } from '@react-navigation/native-stack';  // Importa a tipagem de navegação de pilha
import { StackParamList } from '../../../App';  // Importa o tipo de lista de parâmetros de navegação

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

// Tipagem para a navegação para a tela 'UsuarioAddAdmin'
type NavigationProps = NativeStackNavigationProp<StackParamList, 'UsuarioAddAdmin'>;

export const CertificadoAddAdmin = () => {
  // Usa o hook de navegação para navegar entre as telas
  const navigation = useNavigation<NavigationProps>();
  
  // Usa o hook useRoute para acessar os parâmetros passados pela rota
  const route = useRoute();
  
  // Extrai o parâmetro 'idUsuario' da rota
  const { idUsuario } = route.params as { idUsuario: number };

  // Define os estados locais para armazenar os dados do certificado (texto, horas, dataConclusao)
  const [texto, setTexto] = useState('');
  const [horas, setHoras] = useState('');
  const [dataConclusao, setDataConclusao] = useState('');

  // Função responsável por cadastrar o certificado
  const handleCadastro = async () => {
    // Verifica se todos os campos estão preenchidos
    if (!texto || !horas || !dataConclusao) {
      alert('Todos os campos são obrigatórios!');  // Exibe um alerta caso algum campo esteja vazio
      return;  // Retorna para não continuar com o cadastro
    }

    try {
      // Realiza a requisição POST para cadastrar o certificado no backend
      const response = await axios.post(`http://${ipconfig}:3000/certificado/cadastro`, {texto, horas, dataConclusao, idUsuario});

      // Verifica se a resposta foi bem-sucedida (status 200)
      if (response.status === 200) {
        navigation.navigate('CertificadoAdmin');  // Navega para a tela de administração de certificados
        alert(`Certificado cadastrado com sucesso!`);  // Exibe uma mensagem de sucesso
      }
    } catch (err) {
      // Exibe uma mensagem de erro caso a requisição falhe
      alert("Não foi possível cadastrar o certificado! Consulte o administrador.");
      return;  // Retorna caso haja erro
    }
  };

  return (
    // SafeAreaView é usado para garantir que o conteúdo seja exibido dentro da área segura da tela
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>CADASTRAR CERTIFICADO</Text>
        </View>
      </View>

      <View style={Global.containerForm}>
        <Text style={Global.label}>Texto:</Text>
        <TextInput
          style={Global.input}  // Estilo do campo de entrada
          placeholder="Digite o texto..."  // Texto de exemplo no campo
          value={texto}  // Define o valor do campo como o estado 'texto'
          onChangeText={setTexto}  // Atualiza o estado 'texto' sempre que o valor do campo mudar
        />

        <Text style={Global.label}>Horas</Text>
        <TextInput
          style={Global.input}  // Estilo do campo de entrada
          placeholder="Digite as horas..."  // Texto de exemplo no campo
          value={horas}  // Define o valor do campo como o estado 'horas'
          onChangeText={setHoras}  // Atualiza o estado 'horas' sempre que o valor do campo mudar
        />

        <Text style={Global.label}>Data de conclusão:</Text>
        <TextInput
          style={Global.input}  // Estilo do campo de entrada
          placeholder="Digite a data de conclusão..."  // Texto de exemplo no campo
          value={dataConclusao}  // Define o valor do campo como o estado 'dataConclusao'
          onChangeText={setDataConclusao}  // Atualiza o estado 'dataConclusao' sempre que o valor do campo mudar
        />

        <TouchableOpacity onPress={handleCadastro} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
