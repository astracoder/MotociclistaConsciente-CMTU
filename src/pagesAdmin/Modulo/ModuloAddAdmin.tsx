import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'ModuloAddAdmin'>;

export const ModuloAddAdmin = () => {
  const navigation = useNavigation<NavigationProps>();

  const [nome, setNome] = useState('');
  const [porcentagem, setPorcentagem] = useState('');

  const handleCadastro = async () => {
    if (!nome || !porcentagem) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.126:3000/modulo/cadastro', {nome, porcentagem});

      if (response.status === 200) {
        navigation.navigate('ModuloAdmin');
        alert(`Módulo cadastrado com sucesso!`);
      }
    } catch (err) {
      alert("Não foi possível cadastrar o módulo! Consulte o administrador.");
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
          <Text style={Global.nomeAba}>CADASTRAR MÓDULOS</Text>
        </View>
      </View>

      <View style={Global.containerForm}>
      <Text style={Global.label}>Módulo:</Text>
        <TextInput
          style={Global.input}
          placeholder="Digite o nome do módulo..."
          value={nome}
          onChangeText={setNome}
        />

        <Text style={Global.label}>Porcentagem:</Text>
        <TextInput
          style={Global.input}
          placeholder="Porcentagem para passar o módulo..."
          value={porcentagem}
          onChangeText={setPorcentagem}
          />

        <TouchableOpacity onPress={handleCadastro} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
