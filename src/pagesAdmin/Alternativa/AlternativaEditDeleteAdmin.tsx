import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'UsuarioAddAdmin'>;

export const AlternativaEditDeleteAdmin  = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  
  const { id, texto: textoInicial} = route.params as {
    id: number;
    texto: string;
  };

  const [texto, setTexto] = useState(textoInicial);

  const handleSalvar = async () => {
    if (!texto) {
      Alert.alert('O campo de texto está vazio!');
      return;
    }

    try {
        const response = await axios.post('http://192.168.1.126:3000/alternativa/editarAlternativa', {id, texto});
  
        if (response.status === 200) {
          navigation.navigate('AlternativaAdmin');
          alert(`Os dados foram alterados com sucesso!`);
        }
      } catch(err) {
        alert("Não foi possível alterar os dados! Consulte o administrador.");
        return;
      }
  };

  const handleDesativar = async () => {
    try {
        const response = await axios.put('http://192.168.1.126:3000/alternativa/desativarAlternativa', {id});

        if (response.status === 200) {
          navigation.navigate('AlternativaAdmin');
          alert(`Alternativa desativada com sucesso!`);
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
          <Text style={Global.nomeAba}>INFORMAÇÕES DA ALTERNATIVA</Text>
        </View>
      </View>

      <View style={Global.containerForm}>
      <Text style={Global.label}>Edite a alternativa:</Text>
        <TextInput
          style={Global.input}
          placeholder="Nome"
          value={texto}
          onChangeText={setTexto}
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
