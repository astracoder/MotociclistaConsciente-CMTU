import React, { useState, useEffect } from 'react';
import {Text, SafeAreaView, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../../App';
import { useUser } from '../../context/UserContext.js';
import ResetStyles from '../../styles/Reset/ResetStyles.ts';

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

//Tipagem da pagina TYPESCRIPT
type NavigationProps = NativeStackNavigationProp<StackParamList, 'Reset'>

//Variaveis e funções do reset
export const Reset = () => {

  const navigation = useNavigation<NavigationProps>();

  // user são os dados que foram setados pelo useUser na tela de Login, e pode ser usado aqui e em qualquer pagina.
  const { user } = useUser();

  //Instancia useStates para id e senhas novas
  const id_usuario = user.id_usuario;
  const [senhaNova, setSenhaNova] = useState('');
  const [senhaNovaRepitida, setSenhaNovaRepitida] = useState('');

  //Funções para verificação do dados do input
  const handleEditarSenha = async () => { 
    //Se estiver vazio
    if(!senhaNova || !senhaNovaRepitida) {
      Alert.alert("Preencha todos os dados!");
      return;
    }

    //Se as senhas estiverem diferentes
    if(senhaNova !== senhaNovaRepitida) {
      Alert.alert("A nova senha não esta correta!");
      return;
    }

    //Se tem ao menos 8 digitos
    if(senhaNova.length < 8 || senhaNovaRepitida.length < 8) {
      Alert.alert("Senha deve ter 8 caracteres!");
      return;
    }

    //Um Try Catch para tentar executar conexão com o banco para obter os dados do usuario
    try {

      //Uma variavel para receber o resultado da requisição PUT onde é informado o ID do usuario e senha nova
      const response = await axios.put(`http://${ipconfig}:3000/usuario/editarSenha`, {id_usuario, senhaNova});

      //Se response 200, senha alterada com sucesso
      if (response.status === 200) {
        navigation.navigate('Perfil');
        Alert.alert(`Senha alterada com sucesso!`);
        return;
      }

    } catch(err) { //Se der erro, da um alerta
      Alert.alert("Ocorreu um erro ao tentar alterar a senha!");
      return;
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