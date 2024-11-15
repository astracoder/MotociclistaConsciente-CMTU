import React, { useState } from 'react';
import { Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type StackParamList = {
  Login: undefined;
  Cadastro: undefined
}

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Cadastro'>

import CadastroStyles from '../../styles/Cadastro/CadastroStyles.ts';

export default function App() {
  const navigation = useNavigation<NavigationProps>();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    if(!nome || !email || !senha) {
      alert("Preencha todos os dados!");
    }

    try {
      const response = await axios.post('http://localhost:5432/')
    } catch(err) {

    }
  };

  return (
    <SafeAreaView style={CadastroStyles.container}>
      <SafeAreaView style={CadastroStyles.content}>
        <Image 
          style={CadastroStyles.logo} 
          source={require('../../assets/cmtu_logo.png')} 
          resizeMode="contain" 
        />
        <Text style={CadastroStyles.titulo}>Registro</Text>
        <Text style={CadastroStyles.subTitulo}>Faça parte dessa família</Text>

        <Text style={CadastroStyles.textoInput}>Nome:</Text>
        <TextInput 
          style={CadastroStyles.input} 
          placeholder="Digite o nome completo..." 
          onChangeText={setNome}
          textContentType='name'
        />

        <Text style={CadastroStyles.textoInput}>E-mail:</Text>
        <TextInput 
          style={CadastroStyles.input} 
          placeholder="Digite seu melhor e-mail..." 
          onChangeText={setEmail}
          textContentType='emailAddress'
        />

        <Text style={CadastroStyles.textoInput}>Senha:</Text>
        <TextInput 
          style={CadastroStyles.input} 
          placeholder="Digite sua melhor senha..." 
          secureTextEntry 
          onChangeText={setSenha}
          textContentType='password'
        />

        <TouchableOpacity onPress={() => handleCadastro()} style={CadastroStyles.botaoCadastro}>
          <Text style={CadastroStyles.textoBotaoCadastro}>CADASTRAR</Text>
        </TouchableOpacity>

        <Image 
          style={CadastroStyles.imagemCadastro} 
          source={require('../../assets/create_account_2.png')} 
          resizeMode="contain" 
        />


        <TouchableOpacity style={CadastroStyles.secaoCriarConta} onPress={() => navigation.navigate('Login')}>
          <Text style={CadastroStyles.linkCriarConta}>Já tenho conta, fazer login!</Text>
        </TouchableOpacity>
        </SafeAreaView>
    </SafeAreaView>
  );
}


