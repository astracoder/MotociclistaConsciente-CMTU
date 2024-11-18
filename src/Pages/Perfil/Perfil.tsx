import React from 'react';
import { Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons.js';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type StackParamList = {
  Login: undefined;
  Cadastro: undefined
}

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Perfil'>

import PerfilStyles from '../../styles/Perfil/PerfilStyles.ts';

export const Perfil = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
      <SafeAreaView style={PerfilStyles.container}>
      <Image 
          style={PerfilStyles.motociclistaConsciente} 
          source={require('../../assets/moto_consciente_red.png')} 
          resizeMode="contain" 
        />
        <View style={PerfilStyles.content}>
          <Text style={PerfilStyles.textoInput}>Nome:</Text>
          <TextInput 
            style={PerfilStyles.input} 
            placeholder="Ex: Flávio de Souza" 
          />
  
          <Text style={PerfilStyles.textoInput}>E-mail:</Text>
          <TextInput 
            style={PerfilStyles.input} 
            placeholder="Ex: flavio.souza@email.com" 
          />

          <TouchableOpacity style={PerfilStyles.botaoMudarSenha}>
            <Text style={PerfilStyles.textoBotaoMudarSenha}>MUDAR SENHA</Text>
          </TouchableOpacity>

          <TouchableOpacity style={PerfilStyles.botaoSalvarDados}>
            <Text style={PerfilStyles.textoBotaoSalvarDados}>SALVAR ALTERAÇÕES</Text>
          </TouchableOpacity>
        </View> 

        <View style={PerfilStyles.rodape}>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={PerfilStyles.iconRodape}>
            <Icon name="home" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
}


