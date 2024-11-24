import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Global from '../../stylesAdmin/Global/globalStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/native';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'UsuarioAdmin'>

export const UsuarioAdmin = () => {
  const navigation = useNavigation<NavigationProps>();

    const [dados, setDados] = useState<any[]>([]);

    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.9:3000/usuario/selecionarUsuarios');
        const json = await response.json();

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
      fetchData();
    }, []);

  return (
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>

        <TouchableOpacity onPress={() => navigation.navigate('CertificadoAdmin')} style={Global.setas}>
          <Text style={{color: '#ED1C24', fontSize: 48}}>
            {'⬅'}
          </Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>
            USUARIO
          </Text>          
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ModuloAdmin')} style={Global.setas}>
          <Text style={{color: '#ED1C24', fontSize: 48}}>
            {'⮕'}
          </Text>
        </TouchableOpacity>

      </View>
      
      <ScrollView style={Global.containerView}>

      {dados.map((item, index) => (
        <TouchableOpacity onPress={() => navigation.navigate('UsuarioEditDeleteAdmin', {id: item.id_usuario, nome: item.nome, email: item.email, senha: item.senha})} key={index} style={Global.containerBoxInfo}>
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