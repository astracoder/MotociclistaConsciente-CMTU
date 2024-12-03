import React, { useState } from 'react';
import {Text, SafeAreaView, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../../App.js';
import { useUser } from '../../context/UserContext.js';
import LoginStyles from '../../styles/Login/LoginStyles.ts';

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

//Tipagem da pagina TYPESCRIPT
type NavigationProps = NativeStackNavigationProp<StackParamList, 'Login'>

//Variaveis e funções do login
export const Login = () => {
  const navigation = useNavigation<NavigationProps>();

  //Instanciado um novo useUser vazio que recebe id, nome e email. setUserData é global
  const { setUserData } = useUser();

  //"Variaveis" que armazenam o login e senha
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  //Função para Login
  const handleLogin = async () => {
    //Se caso os "varias" email e senha estive vazinhas, return 
    if(!email && !senha) {
      Alert.alert("Preencha todos os dados!");
      return;
    }

    //Um Try Catch para tentar executar conexão com o banco para obter os dados do usuario
    try {
      //Uma variavel que recebe dados do envio de informações do banco de dados via Axios (Conexão com banco)
      const response = await axios.post(`http://${ipconfig}:3000/usuario/login`, {email, senha});

      //Se sucesso com a conexão
      if (response.status === 200) {
        //Desestruturando a variavel response para pegar os dados e definir no SetUserData
        const { id_usuario, nome, email, admin } = response.data;
        setUserData(id_usuario, nome, email);

        //Se o usuario for admin, vai ser encaminhado para a tela Admin
        if(admin == 1){
          navigation.navigate('UsuarioAdmin');
          return;
        } else { //Caso não, acesso ao App normalmente
         navigation.navigate('Menu');
         return;
        }
      }
      
    } catch(err) { //Se der erro, da um alert de 'erro' e termina a função catch
      Alert.alert("E-mail ou senha inválidos!");
      return;
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
        <Text style={LoginStyles.subTitulo}>Bem-vindo de volta.</Text>

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