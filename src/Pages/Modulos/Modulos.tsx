import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons.js';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../../App';
import { useUser } from '../../context/UserContext.js';
import ModulosStyles from '../../styles/Modulos/ModulosStyles.ts';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Modulos'>

export const Modulos = () => {
  const navigation = useNavigation<NavigationProps>();

  const { user } = useUser();
  const [dados, setDados] = useState<any[]>([]);

    const handleListarModulos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/modulo/selecionarTodosModulosAtivados');
        const json = response.data;

        if (Array.isArray(json)) {
          setDados(json); 
        } else {
          console.warn('A resposta da API não é um array:', json);
          setDados([]);
        }
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  useEffect(() => {
    handleListarModulos();
  }, []);

  const handleIniciarModulo = async (idModulo: number) => {
    try {
      if (!user || !user.id_usuario) {
        console.error("Usuário não encontrado!");
        return;
      }

      await axios.post('http://localhost:3000/usuarioModulo/atualizarIniciado', {
        idModulo,
        idUsuario: user.id_usuario
      });

      navigation.navigate('Perguntas', { idModulo });
    } catch (error) {
      console.error('Erro ao iniciar o módulo:', error);
      alert('Erro ao iniciar o módulo. Tente novamente.');
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

        {dados.map((item, index) => (
          <TouchableOpacity key={index} style={ModulosStyles.pergunta} onPress={() => handleIniciarModulo(item.id_modulo)}>
            <Text style={ModulosStyles.textoBotao}>{item.nome}</Text>
          </TouchableOpacity>
        ))}
        </View> 

        <View style={ModulosStyles.rodape}>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={ModulosStyles.iconRodape}>
            <Icon name="home" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
}


