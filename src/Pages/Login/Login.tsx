import React, { useState } from 'react';
import {Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { useUser } from '../../Context/UserContext';

type StackParamList = {
  Login: undefined;
  Cadastro: undefined,
  Menu: undefined,
  Reset: undefined
}

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Login'>

import LoginStyles from '../../styles/Login/LoginStyles.ts';

export const Login = () => {
  const navigation = useNavigation<NavigationProps>();
  const { setUserInfo } = useUser();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if(!email || !senha) {
      alert("Preencha todos os dados!");
    }

    try {
      const response = await axios.post('http://192.168.1.126:3000/usuario/login', {email, senha});

      if (response.status === 200) {
        const dadosUsuario = response.data;
        setUserInfo(dadosUsuario);
        console.log(`Email: ${email} senha: ${senha} Dados: ${dadosUsuario}`);
        navigation.navigate('Menu');
      }
    } catch(err) {
      alert("E-mail ou senha inválidos!");
    }
  };

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
          onChangeText={setEmail}
          value={email}
        />

        <Text style={LoginStyles.textoInput}>Senha:</Text>
        <TextInput 
          style={LoginStyles.input} 
          placeholder="Digite sua senha..." 
          secureTextEntry 
          onChangeText={setSenha}
          value={senha}
        />

        <TouchableOpacity onPress={() => handleLogin()}style={LoginStyles.botaoLogin}>
          <Text style={LoginStyles.textoBotaoLogin}>Login</Text>
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