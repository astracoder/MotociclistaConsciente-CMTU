import React, { useState } from 'react';
import { Text, SafeAreaView, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../../App';
import CadastroStyles from '../../styles/Cadastro/CadastroStyles.ts';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Cadastro'>

export const Cadastro = () => {
  const navigation = useNavigation<NavigationProps>();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    if(!nome || !email || !senha) {
      alert("Preencha todos os dados!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/usuario/cadastro', {nome, email, senha});

      if (response.status === 200) {
        navigation.navigate('Login');
        alert(`${nome} sua conta foi cadastrada com sucesso!`);
      }
    } catch(err) {
      alert("Não foi possível cadastrar usuário! Consulte o administrador.");
      return;
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
        <Text style={CadastroStyles.subTitulo}>Faça parte e venha aprender.</Text>

        <Text style={CadastroStyles.textoInput}>Nome:</Text>
        <TextInput 
          style={CadastroStyles.input} 
          placeholder="Digite o nome completo..." 
          onChangeText={setNome}
          value={nome}
          textContentType='name'
        />

        <Text style={CadastroStyles.textoInput}>E-mail:</Text>
        <TextInput 
          style={CadastroStyles.input} 
          placeholder="Digite seu melhor e-mail..." 
          onChangeText={setEmail}
          value={email}
          textContentType='emailAddress'
        />

        <Text style={CadastroStyles.textoInput}>Senha:</Text>
        <TextInput 
          style={CadastroStyles.input} 
          placeholder="Digite sua melhor senha..." 
          secureTextEntry 
          onChangeText={setSenha}
          value={senha}
          textContentType='password'
        />

        <TouchableOpacity onPress={() => handleCadastro()} style={CadastroStyles.botaoCadastro}>
          <Text style={CadastroStyles.textoBotaoCadastro}>Cadastrar</Text>
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


