import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'UsuarioAddAdmin'>;

export const UsuarioEditDeleteAdmin  = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  
  const { id, nome: nomeInicial, email: emailInicial } = route.params as {
    id: number;
    nome: string;
    email: string;
  };

  const [nome, setNome] = useState(nomeInicial);
  const [email, setEmail] = useState(emailInicial);

  const handleSalvar = async () => {
    if (!nome || !email) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    try {
        const response = await axios.post('http://localhost:3000/usuario/editarNomeEmail', {id, nome, email});
  
        if (response.status === 200) {
          navigation.navigate('UsuarioAdmin');
          alert(`Os dados foram alterados com sucesso!`);
        }
      } catch(err) {
        alert("Não foi possível alterar os dados! Consulte o administrador.");
        return;
      }
  };

  const handleDesativar = async () => {
    try {
        const response = await axios.put('http://localhost:3000/usuario/desativarUsuario', {email});

        if (response.status === 200) {
          navigation.navigate('UsuarioAdmin');
          alert(`Usuário desativado com sucesso!`);
        }
    } catch(err) {
        alert("Não foi possível deletar usuário! Consulte o administrador.");
    }
  };

  return (
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>INFORMAÇÕES DO USUÁRIO</Text>
        </View>
      </View>

      <View style={Global.containerForm}>
      <Text style={Global.label}>Edite o nome:</Text>
        <TextInput
          style={Global.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={Global.label}>Edite o e-mail:</Text>
        <TextInput
          style={Global.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TouchableOpacity onPress={() => handleSalvar()} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Salvar alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDesativar()} style={Global.deletar}>
          <Text style={Global.botaoTexto}>Desativar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
