import React, { useState, useEffect } from 'react';  // Importa React e os hooks useState e useEffect
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';  // Importa componentes do React Native
import axios from 'axios';  // Importa axios para realizar requisições HTTP
import Global from '../../stylesAdmin/Global/globalStyles';  // Importa os estilos globais do projeto
import { NativeStackNavigationProp } from '@react-navigation/native-stack';  // Importa o tipo de navegação para pilha de navegação
import { StackParamList } from '../../../App';  // Importa os tipos de parâmetros da navegação definidos no App
import { useNavigation } from '@react-navigation/native';  // Importa o hook useNavigation para navegação

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

// Definição do tipo de navegação para a tela 'ModuloAdmin'
type NavigationProps = NativeStackNavigationProp<StackParamList, 'ModuloAdmin'>;

export const ModuloAdmin = () => {
  // Hook para controlar a navegação entre telas
  const navigation = useNavigation<NavigationProps>();

  // Estado para armazenar os dados dos módulos
  const [dados, setDados] = useState<any[]>([]);

  // Função que faz uma requisição GET para listar os módulos cadastrados
  const handleListarModulos = async () => {
    try {
      // Faz a requisição para o backend para obter os módulos
      const response = await axios.get(`http://${ipconfig}:3000/modulo/selecionarModulos`);
      const json = response.data;

      // Verifica se a resposta da API é um array e atualiza o estado
      if (Array.isArray(json)) {
        setDados(json);
      } else {
        console.warn('A resposta da API não é um array:', json);
        setDados([]);  // Caso não seja um array, define os dados como vazio
      }
    } catch (error) {
      // Caso ocorra um erro na requisição, exibe um erro no console
      console.error('Erro ao buscar os dados:', error);
    }
  };

  // Hook useEffect para chamar a função de listar módulos ao carregar o componente
  useEffect(() => {
    handleListarModulos();
  }, []);  // O array vazio [] faz com que a função seja chamada apenas uma vez após o primeiro render

  return (
    // SafeAreaView garante que o conteúdo não sobreponha a área de interação da tela (ex: barra de status)
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        {/* Botão para voltar para a tela 'UsuarioAdmin' */}
        <TouchableOpacity onPress={() => navigation.navigate('UsuarioAdmin')} style={Global.setas}>
          <Text style={{color: '#ED1C24', fontSize: 48}}>{'↞'}</Text>
        </TouchableOpacity>

        {/* Título da tela 'MÓDULO' */}
        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>MÓDULO</Text>          
        </View>

        {/* Botão para navegar para a tela 'UsuarioModuloAdmin' */}
        <TouchableOpacity onPress={() => navigation.navigate('UsuarioModuloAdmin')} style={Global.setas}>
          <Text style={{color: '#ED1C24', fontSize: 48}}>{'↠'}</Text>
        </TouchableOpacity>

      </View>

      {/* ScrollView para permitir rolagem quando os dados são muitos */}
      <ScrollView style={Global.containerView}>
        {/* Mapeia os dados dos módulos e cria um botão para cada módulo */}
        {dados.map((item, index) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('ModuloEditDeleteAdmin', {id: item.id_modulo, status: item.status, nomeModulo: item.nome, porcentagem: item.porcentagem_necessaria})}
            key={index} 
            style={[Global.containerBoxInfo, item.status === 0 && Global.boxInativo]}  // Aplica estilo adicional se o módulo estiver inativo
          >
            <View style={Global.containerID}>
              <Text style={Global.containerIDTexto}>
                {item.id_modulo}  {/* Exibe o ID do módulo */}
              </Text>
            </View>
            <View style={Global.containerNome}>
              <Text style={Global.containerNomeTexto}>
                {item.nome}  {/* Exibe o nome do módulo */}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Botão para adicionar um novo módulo, navega para a tela 'ModuloAddAdmin' */}
      <TouchableOpacity onPress={() => navigation.navigate('ModuloAddAdmin')} style={Global.adicionar}>
        <Text style={{fontSize: 34, textAlign: 'center', color: 'white'}}>
          +  {/* Símbolo de adicionar */}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
