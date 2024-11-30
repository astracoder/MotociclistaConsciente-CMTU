import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/native';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'ModuloAdmin'>

export const ModuloAdmin = () => {
  const navigation = useNavigation<NavigationProps>();

  const [dados, setDados] = useState<any[]>([]);

    const handleListarModulos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/modulo/selecionarModulos');
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
  
  return (
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>

        <TouchableOpacity onPress={() => navigation.navigate('UsuarioAdmin')} style={Global.setas}>
          <Text style={{color: '#ED1C24', fontSize: 48}}>
            {'⬅'}
          </Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>
            MÓDULO
          </Text>          
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('UsuarioModuloAdmin')} style={Global.setas}>
          <Text style={{color: '#ED1C24', fontSize: 48}}>
            {'⮕'}
          </Text>
        </TouchableOpacity>

      </View>
      
      <ScrollView style={Global.containerView}>

      {dados.map((item, index) => (
        <TouchableOpacity onPress={() => navigation.navigate('ModuloEditDeleteAdmin', {id: item.id_modulo, nomeModulo: item.nome, porcentagem: item.porcentagem_necessaria})} key={index} style={Global.containerBoxInfo}>
          <View style={Global.containerID}>
            <Text style={Global.containerIDTexto}>
              {item.id_modulo} 
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

      <TouchableOpacity onPress={() => navigation.navigate('ModuloAddAdmin')} style={Global.adicionar}>
        <Text style={{fontSize: 34, textAlign: 'center', color: 'white'}}>
          +
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};