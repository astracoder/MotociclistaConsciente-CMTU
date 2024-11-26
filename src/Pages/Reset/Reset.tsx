import React, { useState } from 'react';
import {Text, SafeAreaView, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../../App';
import { useUser } from '../../context/UserContext.js';
import ResetStyles from '../../styles/Reset/ResetStyles.ts';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Reset'>

export const Reset = () => {
  const navigation = useNavigation<NavigationProps>();
  const { user } = useUser();

  const [email, setEmail] = useState('');
  const [senhaNova, setSenhaNova] = useState('');
  const [senhaNovaRepitida, setSenhaNovaRepitida] = useState('');

  const handleEditarSenha = async () => {
    if(!email || !senhaNova) {
      alert("Preencha todos os dados!");
      return;
    }

    if(senhaNova !== senhaNovaRepitida) {
      alert("A nova senha não esta correta!");
      return;
    }

    if(senhaNova.length < 8 || senhaNovaRepitida.length < 8) {
      alert("Senha deve ter 8 caracteres!");
      return;
    }

    try {
      const response = await axios.put('http://192.168.1.126:3000/usuario/editarSenha', {email, senhaNova});

      if (response.status === 200) {
        navigation.navigate('Perfil');
        alert(`Senha alterada com sucesso!`);
        return;
      }
    } catch(err) {
      alert("Ocorreu um erro ao tentar alterar a senha!");
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
          onChangeText={setEmail}
          value={email}
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
          placeholder="Digite a nova senha..." 
          secureTextEntry 
          onChangeText={setSenhaNovaRepitida}
          value={senhaNovaRepitida}
        />

        <TouchableOpacity onPress={() => handleEditarSenha()} style={ResetStyles.botaoSalvar}>
          <Text style={ResetStyles.textoBotaoSalvar}>Salvar alteração</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Text style={ResetStyles.voltar}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}