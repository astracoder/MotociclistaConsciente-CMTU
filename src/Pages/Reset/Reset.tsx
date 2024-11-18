import React, { useState } from 'react';
import {Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type StackParamList = {
  Login: undefined;
  Cadastro: undefined,
  Configuracoes: undefined
}

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Reset'>

import ResetStyles from '../../styles/Reset/ResetStyles.ts';

export const Reset = () => {
  const navigation = useNavigation<NavigationProps>();

  const [email, setEmmail] = useState('');
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [senhaNova, setSenhaNova] = useState('');
  const [senhaNovaRepitida, setSenhaNovaRepitida] = useState('');

  const handleEditarSenha = async () => {
    if(!senhaAntiga || !senhaNova) {
      alert("Preencha todos os dados!");
    }

    if(senhaNova != senhaNovaRepitida) {
      alert("A nova senha está diferente!");
    }

    try {
      const response = await axios.post('http://localhost:3000/usuario/editarSenha', {senhaAntiga, senhaNova});

      if (response.status === 200) {
        console.log(`Email: ${senhaAntiga} senha: ${senhaNova}`);
        navigation.navigate('Configuracoes');
      }
    } catch(err) {
      alert("Senhas inválidas!");
    }
  };

  return (
    <SafeAreaView style={ResetStyles.container}>
      <SafeAreaView style={ResetStyles.content}>
        <Image 
          style={ResetStyles.logo} 
          source={require('../../assets/cmtu_logo.png')} 
          resizeMode="contain" 
        />
        <Text style={ResetStyles.titulo}>Alteração de senha</Text>

        <Text style={ResetStyles.textoInput}>E-mail</Text>
        <TextInput 
          style={ResetStyles.input} 
          placeholder="Digite seu e-mail..." 
          secureTextEntry
          onChangeText={setSenhaAntiga}
          value={senhaAntiga}
        />

        <Text style={ResetStyles.textoInput}>Senha atual:</Text>
        <TextInput 
          style={ResetStyles.input} 
          placeholder="Digite sua senha atual..." 
          secureTextEntry
          onChangeText={setSenhaAntiga}
          value={senhaAntiga}
        />

        <Text style={ResetStyles.textoInput}>Nova senha:</Text>
        <TextInput 
          style={ResetStyles.input} 
          placeholder="Digite a nova senha..." 
          secureTextEntry 
          onChangeText={setSenhaNova}
          value={senhaNova}
        />

        <Text style={ResetStyles.textoInput}>Repita nova senha:</Text>
        <TextInput 
          style={ResetStyles.input} 
          placeholder="Digite a nova senha novamente..." 
          secureTextEntry 
          onChangeText={setSenhaNovaRepitida}
          value={senhaNovaRepitida}
        />

        <TouchableOpacity onPress={() => handleEditarSenha()} style={ResetStyles.botaoSalvar}>
          <Text style={ResetStyles.textoBotaoSalvar}>Salvar alteração</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={ResetStyles.voltar}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}