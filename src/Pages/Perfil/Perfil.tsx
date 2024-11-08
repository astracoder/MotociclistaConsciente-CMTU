import React from 'react';
import { Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type StackParamList = {
  Login: undefined;
  Cadastro: undefined
}

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Perfil'>

import CadastroStyles from '../../styles/Perfil/PerfilStyles.ts';

export default function App() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView style={CadastroStyles.container}>
      <SafeAreaView style={CadastroStyles.content}>
        <Image 
          style={CadastroStyles.logo} 
          source={require('../../assets/cmtu_logo.png')} 
          resizeMode="contain" 
        />
        <Text style={CadastroStyles.titulo}>Edite seus dados</Text>

        <Text style={CadastroStyles.textoInput}>Nome:</Text>
        <TextInput 
          style={CadastroStyles.input} 
          placeholder="Ex: Flávio de Souza" 
        />

        <Text style={CadastroStyles.textoInput}>E-mail:</Text>
        <TextInput 
          style={CadastroStyles.input} 
          placeholder="Ex: flavio.souza@email.com" 
        />

        <TouchableOpacity style={CadastroStyles.botaoMudarSenha}>
          <Text style={CadastroStyles.textoBotaoMudarSenha}>MUDAR SENHA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={CadastroStyles.botaoSalvarDados}>
          <Text style={CadastroStyles.textoBotaoSalvarDados}>SALVAR ALTERAÇÕES</Text>
        </TouchableOpacity>
        </SafeAreaView>
    </SafeAreaView>
  );
}


