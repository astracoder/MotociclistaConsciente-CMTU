import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons.js';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../../App';
import { useUser } from '../../context/UserContext.js';
import ModulosStyles from '../../styles/Modulos/ModulosStyles.ts';

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

//Tipagem da pagina TYPESCRIPT
type NavigationProps = NativeStackNavigationProp<StackParamList, 'Modulos'>;

//Variaveis e funções do Menu
export const Modulos = () => {
  const navigation = useNavigation<NavigationProps>();

  // user são os dados que foram setados pelo useUser na tela de Login, e pode ser usado aqui e em qualquer pagina.
  const { user } = useUser();

  // Estado para armazenar os módulos retornados da API
  const [dados, setDados] = useState<any[]>([]);

  // Estado para verificar se o usuário concluiu todos os módulos
  const [todosAprovados, setTodosAprovados] = useState<boolean>(false);

  // Função para carregar os dados dos módulos e verificar a aprovação do usuário
  const carregarDados = async () => {
    try {
      if (!user || !user.id_usuario) {
        console.error('Usuário não encontrado!');
        return;
      }

      // Faz uma requisição para verificar se o usuário foi aprovado em todos os módulos
      const verificacaoResponse = await axios.get(`http://${ipconfig}:3000/usuarioModulo/verificarAprovacao`, {
        params: { idUsuario: user.id_usuario },
      });

      const { status } = verificacaoResponse.data;

      // Caso todos os módulos sejam aprovados, atualiza o estado e retorna
      if (status === 1) {
        setTodosAprovados(true);
        return;
      }

      // Faz uma requisição para listar os módulos disponíveis para o usuário
      const listarResponse = await axios.get(`http://${ipconfig}:3000/usuarioModulo/listarModulosPorUsuario`, {
        params: { idUsuario: user.id_usuario },
      });

      // Atualiza o estado com os dados retornados
      setDados(listarResponse.data || []);
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
      Alert.alert('Não foi possível carregar os dados. Tente novamente.');
    }
  };

  // useEffect para carregar os dados quando o componente for montado
  useEffect(() => {
    carregarDados();
  }, []);

  // Função para iniciar um módulo específico
  const handleIniciarModulo = async (idModulo: number) => {
    try {
      if (!user || !user.id_usuario) {
        console.error('Usuário não encontrado!');
        return;
      }

      // Faz uma requisição para marcar o módulo como iniciado
      await axios.post(`http://${ipconfig}:3000/usuarioModulo/atualizarIniciado`, {
        idModulo,
        idUsuario: user.id_usuario,
      });

      navigation.navigate('Perguntas', { idModulo });
    } catch (error) {
      console.error('Erro ao iniciar o módulo:', error);
      Alert.alert('Não foi possível iniciar o módulo. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={ModulosStyles.container}>
      <Image
        style={ModulosStyles.motociclistaConsciente}
        source={require('../../assets/moto_consciente_red.png')}
        resizeMode="contain"
      />
      <View style={ModulosStyles.content}>
        <Text style={ModulosStyles.titulo}>Módulos</Text>

        {todosAprovados ? (
          <Text style={ModulosStyles.mensagemFinal}>Você já concluiu todos os módulos disponíveis!</Text>
        ) : dados.length === 0 ? (
          <Text style={ModulosStyles.mensagemVazia}>
            Parabéns, não há mais módulos disponíveis para você. Gere seu certificado!
          </Text>
        ) : (
          dados.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={ModulosStyles.pergunta}
              onPress={() => handleIniciarModulo(item.id_modulo)}
            >
              <Text style={ModulosStyles.textoBotao}>{item.nome}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>
      <View style={ModulosStyles.rodape}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={ModulosStyles.iconRodape}>
          <Icon name="home" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
