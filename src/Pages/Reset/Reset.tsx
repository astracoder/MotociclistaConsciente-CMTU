import React from 'react';
import {Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type StackParamList = {
  Login: undefined;
  Cadastro: undefined
}

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Reset'>

import ResetStyles from '../../styles/Reset/ResetStyles.ts';

export default function Login() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView style={ResetStyles.container}>
      <SafeAreaView style={ResetStyles.content}>
        <Image 
          style={ResetStyles.logo} 
          source={require('../../assets/cmtu_logo.png')} 
          resizeMode="contain" 
        />
        <Text style={ResetStyles.titulo}>Alteração de senha</Text>

        <Text style={ResetStyles.textoInput}>Senha atual:</Text>
        <TextInput 
          style={ResetStyles.input} 
          placeholder="Sua senha atual..." 
          secureTextEntry
        />

        <Text style={ResetStyles.textoInput}>Nova senha:</Text>
        <TextInput 
          style={ResetStyles.input} 
          placeholder="Digite sua senha..." 
          secureTextEntry 
        />

        <Text style={ResetStyles.textoInput}>Repita nova senha:</Text>
        <TextInput 
          style={ResetStyles.input} 
          placeholder="Digite sua senha..." 
          secureTextEntry 
        />

        <TouchableOpacity style={ResetStyles.botaoSalvar}>
          <Text style={ResetStyles.textoBotaoSalvar}>Salvar alteração</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={ResetStyles.voltar}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}