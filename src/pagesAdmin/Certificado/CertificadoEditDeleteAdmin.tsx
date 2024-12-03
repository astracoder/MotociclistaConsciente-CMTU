import React, { useState } from 'react';  // Importa React e o hook useState para gerenciar estado no componente
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';  // Importa componentes essenciais do React Native
import axios from 'axios';  // Importa a biblioteca axios para fazer requisições HTTP
import Global from '../../stylesAdmin/Global/globalStyles';  // Importa estilos globais para o aplicativo
import { useNavigation, useRoute } from '@react-navigation/native';  // Importa hooks de navegação
import { NativeStackNavigationProp } from '@react-navigation/native-stack';  // Importa tipagem para navegação em pilha
import { StackParamList } from '../../../App';  // Importa a lista de parâmetros de navegação definidos no app

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

// Tipagem para navegação para a tela 'UsuarioAddAdmin'
type NavigationProps = NativeStackNavigationProp<StackParamList, 'UsuarioAddAdmin'>;

export const CertificadoEditDeleteAdmin = () => {
  // Hook useNavigation para navegação entre as telas
  const navigation = useNavigation<NavigationProps>();

  // Hook useRoute para acessar parâmetros passados pela navegação
  const route = useRoute();

  // Desestrutura os parâmetros passados via navegação
  const { id, status, texto: textoInicial, horas: horasInicial, data_conclusao: dataConclusao } = route.params as {
    id: number;
    status: number;
    texto: string;
    horas: number;
    data_conclusao: Date;
  };

  console.log(status);  // Log do status para depuração (pode ser removido depois)

  // Definindo os estados para texto, horas e data de conclusão
  const [texto, setTexto] = useState(textoInicial);  // Estado para o texto do certificado
  const [horas, setHoras] = useState(horasInicial);  // Estado para as horas do certificado
  const [data_conclusao, setDataConclusao] = useState(dataConclusao);  // Estado para a data de conclusão

  // Função assíncrona para salvar as alterações do certificado
  const handleSalvar = async () => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!texto || !horas || !data_conclusao) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');  // Exibe um alerta caso algum campo esteja vazio
      return;
    }

    try {
      // Envia as alterações para o backend usando uma requisição PUT
      const response = await axios.put(`http://${ipconfig}:3000/certificado/editarCertificado`, { id, texto, horas, data_conclusao });
  
      // Se a requisição for bem-sucedida, navega de volta para a tela de administração
      if (response.status === 200) {
        navigation.navigate('CertificadoAdmin');
        alert(`Os dados foram alterados com sucesso!`);
      }
    } catch (err) {
      // Exibe um alerta caso haja erro ao salvar os dados
      alert("Não foi possível alterar os dados! Consulte o administrador.");
      return;
    }
  };

  // Função assíncrona para ativar o certificado
  const handleAtivar = async () => {
    try {
      // Envia uma requisição PUT para ativar o certificado
      const response = await axios.put(`http://${ipconfig}:3000/certificado/ativarCertificado`, { id });

      // Se a requisição for bem-sucedida, navega para a tela de administração e exibe um alerta de sucesso
      if (response.status === 200) {
        navigation.navigate('CertificadoAdmin');
        alert(`Certificado ativado com sucesso!`);
      }
    } catch (err) {
      // Exibe um alerta caso ocorra um erro ao ativar o certificado
      alert("Não foi possível ativar o certificado! Consulte o administrador.");
    }
  };

  // Função assíncrona para desativar o certificado
  const handleDesativar = async () => {
    try {
      // Envia uma requisição PUT para desativar o certificado
      const response = await axios.put(`http://${ipconfig}:3000/certificado/desativarCertificado`, { id });

      // Se a requisição for bem-sucedida, navega para a tela de administração e exibe um alerta de sucesso
      if (response.status === 200) {
        navigation.navigate('CertificadoAdmin');
        alert(`Certificado desativado com sucesso!`);
      }
    } catch (err) {
      // Exibe um alerta caso ocorra um erro ao desativar o certificado
      alert("Não foi possível deletar certificado! Consulte o administrador.");
    }
  };

  return (
    // SafeAreaView é usado para garantir que o conteúdo não fique sobreposto à área de interação (como a barra de status)
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>INFORMAÇÕES DO CERTIFICADO</Text>
        </View>
      </View>

      <View style={Global.containerForm}>
        <Text style={Global.label}>Edite o texto:</Text>
        <TextInput
          style={Global.input}
          placeholder="Texto..."
          value={texto}
          onChangeText={setTexto}  // Atualiza o estado 'texto' com a nova entrada
        />

        <Text style={Global.label}>Edite as horas:</Text>
        <TextInput
          style={Global.input}
          placeholder="Horas..."
          value={horas}
          onChangeText={setHoras}  // Atualiza o estado 'horas' com a nova entrada
        />

        <Text style={Global.label}>Edite a data de conclusão:</Text>
        <TextInput
          style={Global.input}
          placeholder="Data de conclusão (YY/MM/DD)..."
          value={data_conclusao}
          onChangeText={setDataConclusao}  // Atualiza o estado 'data_conclusao' com a nova entrada
        />

        <TouchableOpacity onPress={() => handleSalvar()} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Salvar alterações</Text>
        </TouchableOpacity>

        {status === 1 ? (
          // Se o status for 1 (ativo), permite desativar o certificado
          <TouchableOpacity onPress={handleDesativar} style={Global.deletar}>
            <Text style={Global.botaoTexto}>Desativar</Text>
          </TouchableOpacity>
        ) : (
          // Se o status não for 1, permite ativar o certificado
          <TouchableOpacity onPress={handleAtivar} style={Global.ativar}>
            <Text style={Global.botaoTexto}>Ativar</Text>
          </TouchableOpacity>
        )}
        
      </View>
    </SafeAreaView>
  );
};
