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
  
  const { id, status, texto: textoInicial} = route.params as {
    id: number;
    status: number;
    texto: string;
  };

  const [texto, setTexto] = useState(textoInicial);

  const handleSalvar = async () => {
    if (!texto) {
      Alert.alert('O campo de texto está vazio!');
      return;
    }

    try {
        const response = await axios.post('http://localhost:3000/atividade/editarAtividade', {id, texto});
  
        if (response.status === 200) {
          navigation.navigate('AtividadeAdmin');
          alert(`Os dados foram alterados com sucesso!`);
        }
      } catch(err) {
        alert("Não foi possível alterar os dados! Consulte o administrador.");
        return;
      }
  };

  const handleAtivar = async () => {
    try {
      const response = await axios.put('http://localhost:3000/atividade/ativarAtividade', {id});

      if (response.status === 200) {
        navigation.navigate('AtividadeAdmin');
        alert(`Atividade atividade com sucesso!`);
      }
  } catch(err) {
      alert("Não foi possível desativar a atividade! Consulte o administrador.");
  }
  }

  const handleDesativar = async () => {
    try {
        const response = await axios.put('http://localhost:3000/atividade/desativarAtividade', {id});

        if (response.status === 200) {
          navigation.navigate('AtividadeAdmin');
          alert(`Atividade desativada com sucesso!`);
        }
    } catch(err) {
        alert("Não foi possível desativar a atividade! Consulte o administrador.");
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
      <Text style={Global.label}>Edite a atividade:</Text>
        <TextInput
          style={Global.input}
          value={texto}
          onChangeText={setTexto}
        />

        <TouchableOpacity onPress={() => handleSalvar()} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Salvar alterações</Text>
        </TouchableOpacity>

        {status === 1 ? (
          <TouchableOpacity onPress={handleDesativar} style={Global.deletar}>
            <Text style={Global.botaoTexto}>Desativar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleAtivar} style={Global.ativar}>
            <Text style={Global.botaoTexto}>Ativar</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
