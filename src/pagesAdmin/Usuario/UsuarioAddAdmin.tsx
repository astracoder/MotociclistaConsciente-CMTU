import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'UsuarioAddAdmin'>;

export const UsuarioAddAdmin = () => {
  const navigation = useNavigation<NavigationProps>();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/usuario/cadastro', {nome, email, senha});

      if (response.status === 200) {
        navigation.navigate('UsuarioAdmin');
        alert(`Usuário cadastrado com sucesso!`);
      }
    } catch (err) {
      alert("Não foi possível cadastrar o usuário! Consulte o administrador.");
      return;
    }
  };

  return (
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>CADASTRAR USUÁRIO</Text>
        </View>
      </View>

      <View style={Global.containerForm}>
        <Text style={Global.label}>Nome:</Text>
        <TextInput
          style={Global.input}
          placeholder="Digite o nome..."
          value={nome}
          onChangeText={setNome}
        />
        <Text style={Global.label}>E-mail:</Text>
        <TextInput
          style={Global.input}
          placeholder="Digite o e-mail..."
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={Global.label}>Senha:</Text>
        <TextInput
          style={Global.input}
          placeholder="Digite a senha..."
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity onPress={handleCadastro} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
