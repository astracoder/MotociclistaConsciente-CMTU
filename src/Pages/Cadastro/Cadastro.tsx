import React, { useState } from 'react';
import { Text, SafeAreaView, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../../App';
import CadastroStyles from '../../styles/Cadastro/CadastroStyles.ts';

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

//Tipagem da pagina TYPESCRIPT que é baseada no App.tsx
type NavigationProps = NativeStackNavigationProp<StackParamList, 'Cadastro'>

//Variaveis e funções do cadastro
export const Cadastro = () => {
  const navigation = useNavigation<NavigationProps>();

  //"Variaveis" que armazenam nome, email e senha
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  //Função para cadastro
  const handleCadastro = async () => {
    if(!nome || !email || !senha) {
      Alert.alert("Preencha todos os dados!");
      return;
    }

    //Um Try Catch para tentar executar conexão com o banco para enviar os dados do usuario
    try {
      
      //Uma variavel que recebe dados do envio de informações do banco de dados via Axios (Conexão com banco)
      const response = await axios.post(`http://${ipconfig}:3000/usuario/cadastro`, {nome, email, senha});

      //Se obter sucesso com a conexão
      if (response.status === 200) {
        navigation.navigate('Login');
        Alert.alert(`${nome} sua conta foi cadastrada com sucesso!`);
      }
    } catch(err) { //Se der erro, da um alert de 'erro' e termina a função catch
      Alert.alert("Não foi possível cadastrar usuário! Consulte o administrador.");
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


