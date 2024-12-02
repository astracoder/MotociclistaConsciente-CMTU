import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons.js';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../../App';
import { useUser } from '../../context/UserContext.js';
import ModulosStyles from '../../styles/Modulos/ModulosStyles.ts';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Modulos'>;

export const Modulos = () => {
  const navigation = useNavigation<NavigationProps>();
  const { user } = useUser();
  const [dados, setDados] = useState<any[]>([]);
  const [todosAprovados, setTodosAprovados] = useState<boolean>(false);

  const carregarDados = async () => {
    try {
      if (!user || !user.id_usuario) {
        console.error('Usuário não encontrado!');
        return;
      }

      // Verificar aprovação
      const verificacaoResponse = await axios.get('http://localhost:3000/usuarioModulo/verificarAprovacao', {
        params: { idUsuario: user.id_usuario },
      });

      const { status } = verificacaoResponse.data;

      if (status === 1) {
        setTodosAprovados(true);
        return;
      }

      // Listar módulos
      const listarResponse = await axios.get('http://localhost:3000/usuarioModulo/listarModulosPorUsuario', {
        params: { idUsuario: user.id_usuario },
      });

      setDados(listarResponse.data || []);
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados. Tente novamente.');
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleIniciarModulo = async (idModulo: number) => {
    try {
      if (!user || !user.id_usuario) {
        console.error('Usuário não encontrado!');
        return;
      }

      await axios.post('http://localhost:3000/usuarioModulo/atualizarIniciado', {
        idModulo,
        idUsuario: user.id_usuario,
      });

      navigation.navigate('Perguntas', { idModulo });
    } catch (error) {
      console.error('Erro ao iniciar o módulo:', error);
      Alert.alert('Erro', 'Não foi possível iniciar o módulo. Tente novamente.');
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
            Não há módulos disponíveis no momento. Continue acompanhando!
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
