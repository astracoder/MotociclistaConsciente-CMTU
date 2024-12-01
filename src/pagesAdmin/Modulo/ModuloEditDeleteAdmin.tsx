import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'ModuloEditDeleteAdmin'>;

export const ModuloEditDeleteAdmin  = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  
  const { id, nomeModulo: nomeModuloInicial, porcentagem: porcentagemInicial } = route.params as {
    id: number;
    nomeModulo: string;
    porcentagem: string;
  };

  const [nome, setNome] = useState(nomeModuloInicial);
  const [porcentagem, setPorcentagem] = useState(porcentagemInicial);

  const handleSalvar = async () => {
    if (!nome || !porcentagem) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    try {
        const response = await axios.post('http://localhost:3000/modulo/editarModulo', {id, nome, porcentagem});
  
        if (response.status === 200) {
          navigation.navigate('ModuloAdmin');
          alert(`Os dados foram alterados com sucesso!`);
        }
      } catch(err) {
        alert("Não foi possível alterar os dados! Consulte o administrador.");
        return;
      }
  };

  const handleDesativar = async () => {
    try {
        const response = await axios.put('http://localhost:3000/modulo/desativarModulo', {id});

        if (response.status === 200) {
          navigation.navigate('UsuarioAdmin');
          alert(`Módulo desativado com sucesso!`);
        }
    } catch(err) {
        alert("Não foi possível desativar o módulo! Consulte o administrador.");
    }
  };

  return (
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>INFORMAÇÕES DO MÓDULO</Text>
        </View>
      </View>

        <View style={Global.containerForm}>
        <Text style={Global.label}>Edite o módulo:</Text>
        <TextInput
            style={Global.input}
            placeholder="Nome do módulo"
            value={nome}
            onChangeText={setNome}
          />

        <Text style={Global.label}>Edite a porcentagem do módulo:</Text>
        <TextInput
            style={Global.input}
            placeholder="Porcentagem módulo"
            value={porcentagem}
            onChangeText={setPorcentagem}
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