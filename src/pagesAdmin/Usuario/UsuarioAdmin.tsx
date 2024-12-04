// Importação das dependências necessárias para o componente.
import React, { useState, useEffect } from 'react'; // Importa o React, useState e useEffect para gerenciamento de estado e execução de efeitos.
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'; // Importa os componentes necessários do React Native.
import axios from 'axios'; // Importa axios para fazer requisições HTTP.
import Global from '../../stylesAdmin/Global/globalStyles'; // Importa os estilos globais do projeto.
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Tipagem de navegação para stack.
import { StackParamList } from '../../../App'; // Tipo de lista de parâmetros das telas da aplicação.
import { useNavigation } from '@react-navigation/native'; // Hook de navegação para navegação entre telas.

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'UsuarioAdmin'>; // Tipo de navegação para a tela 'UsuarioAdmin'.

// Componente principal da tela de administração de usuários.
export const UsuarioAdmin = () => {
  const navigation = useNavigation<NavigationProps>(); // Hook para obter a função de navegação.

  const [dados, setDados] = useState<any[]>([]); // Estado para armazenar os dados dos usuários.

  // Função que busca a lista de usuários da API.
  const handleListarUsuarios = async () => {
    try {
      // Envia uma requisição GET para obter os dados de usuários.
      const response = await axios.get(`http://${ipconfig}:3000/usuario/selecionarUsuarios`);
      const json = response.data; // Obtém a resposta da API.

      // Verifica se a resposta é um array e armazena no estado 'dados'. Caso contrário, exibe um aviso.
      if (Array.isArray(json)) {
        setDados(json);
      } else {
        console.warn('A resposta da API não é um array:', json);
        setDados([]);
      }
    } catch (error) {
      // Se ocorrer um erro ao buscar os dados, exibe um log no console.
      console.error('Erro ao buscar os dados:', error);
    }
  };

  // useEffect que chama a função handleListarUsuarios assim que o componente for montado.
  useEffect(() => {
    handleListarUsuarios();
  }, []); // O array vazio como segundo argumento garante que a requisição será feita apenas uma vez após a montagem do componente.

  return (
    // SafeAreaView para garantir que o conteúdo será exibido dentro da área segura, evitando sobreposição de elementos em dispositivos com notch.
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>

        <TouchableOpacity onPress={() => navigation.navigate('DataScienceAdmin')} style={Global.setas}>
          <Text style={{color: '#ED1C24', fontSize: 48}}>
            {'↞'}
          </Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>USUARIO</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ModuloAdmin')} style={Global.setas}>
          <Text style={{color: '#ED1C24', fontSize: 48}}>
            {'↠'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={Global.containerView}>
        {dados.map((item, index) => (
          <TouchableOpacity
            onPress={() =>
              // Navega para a tela de edição ou exclusão, passando os parâmetros do usuário
              navigation.navigate('UsuarioEditDeleteAdmin', {
                id: item.id_usuario,
                status: item.status,
                nome: item.nome,
                email: item.email,
                senha: item.senha,
              })
            }
            key={index} // Chave única para cada item na lista
            style={[Global.containerBoxInfo, item.status === 0 && Global.boxInativo]} // Estiliza o item baseado no status (ativo ou inativo)
          >

            <View style={Global.containerID}>
              <Text style={Global.containerIDTexto}>
                {item.id_usuario}
              </Text>
            </View>

            <View style={Global.containerNome}>
              <Text style={Global.containerNomeTexto}>
                {item.nome}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('UsuarioAddAdmin')} style={Global.adicionar}>
        <Text style={{fontSize: 34, textAlign: 'center', color: 'white'}}>
          +
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
