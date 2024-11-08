import React from 'react';
import {Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type StackParamList = {
  Login: undefined;
  Cadastro: undefined
}

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Login'>

import LoginStyles from '../../styles/Login/LoginStyles.ts';

export default function Login() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView style={LoginStyles.container}>
      <SafeAreaView style={LoginStyles.content}>
        <Image 
          style={LoginStyles.logo} 
          source={require('../../assets/cmtu_logo.png')} 
          resizeMode="contain" 
        />
        <Text style={LoginStyles.titulo}>Login</Text>
        <Text style={LoginStyles.subTitulo}>Bem-vindo de volta</Text>

        <Text style={LoginStyles.textoInput}>E-mail:</Text>
        <TextInput 
          style={LoginStyles.input} 
          placeholder="Digite seu e-mail..." 
        />

        <Text style={LoginStyles.textoInput}>Senha:</Text>
        <TextInput 
          style={LoginStyles.input} 
          placeholder="Digite sua senha..." 
          secureTextEntry 
        />

        <TouchableOpacity>
          <Text style={LoginStyles.esqueceuSenha}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={LoginStyles.botaoLogin}>
          <Text style={LoginStyles.textoBotaoLogin}>LOGAR</Text>
        </TouchableOpacity>

        <Image 
          style={LoginStyles.imagemLogin} 
          source={require('../../assets/login_account_2.png')} 
          resizeMode="contain" 
        />

        <TouchableOpacity style={LoginStyles.secaoCriarConta} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={LoginStyles.linkCriarConta}>Não tenho uma conta, criar agora!</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}