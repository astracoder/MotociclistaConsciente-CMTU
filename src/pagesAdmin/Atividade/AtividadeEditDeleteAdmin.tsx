import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'UsuarioAddAdmin'>;

export const AtividadeEditDeleteAdmin  = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  
  const { id, texto: textoInicial, fk_id: fk_modulo_id_modulo_inicial} = route.params as {
    id: number;
    texto: string;
    fk_id: number;
  };

  const [texto, setTexto] = useState(textoInicial);

  const handleSalvar = async () => {
    if (!texto) {
      Alert.alert('O campo de texto está vazio!');
      return;
    }

    try {
        const response = await axios.post('http://192.168.1.126:3000/atividade/editarAtividade', {id, texto, fk_id});
  
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
        const response = await axios.put('http://192.168.1.126:3000/usuario/desativarUsuario');

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
          <Text style={Global.nomeAba}>INFORMAÇÕES DA ATIVIDADE</Text>
        </View>
      </View>

      <View style={Global.containerForm}>
        <TextInput
          style={Global.input}
          placeholder="Nome"
          value={texto}
          onChangeText={setTexto}
        />

        <TouchableOpacity onPress={() => handleSalvar()} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Salvar alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDesativar()} style={Global.deletar} disabled>
          <Text style={Global.botaoTexto}>Desativar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
