import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert, Switch } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'UsuarioModuloEditDeleteAdmin'>;

export const UsuarioModuloEditDeleteAdmin = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();

  const { id, status, aprovado: aprovadoInicial, iniciado: iniciadoInicial, nota_final: notaFinalInicial } = route.params as {
    id: number;
    status: number;
    aprovado: boolean;
    iniciado: boolean;
    nota_final: number;
  };

  const [aprovado, setAprovado] = useState(aprovadoInicial);
  const [iniciado, setIniciado] = useState(iniciadoInicial);
  const [notaFinal, setNotaFinal] = useState(String(notaFinalInicial));

  const handleSalvar = async () => {
    console.log(aprovado, iniciado, notaFinal, id);
    
    const nota = parseInt(notaFinal, 10);
    if (isNaN(nota) || nota < 0 || nota > 100) {
      Alert.alert('Erro', 'A nota final deve estar entre 0 e 100.');
      return;
    }

    try {
      const response = await axios.put('http://localhost:3000/usuarioModulo/editarUsuarioModulo', {
        aprovado: aprovado ? 1 : 0,
        iniciado: iniciado ? 1 : 0, 
        nota_final: nota,
        id
      });

      if (response.status === 200) {
        navigation.navigate('UsuarioModuloAdmin');
        alert('Os dados foram alterados com sucesso!');
      }
    } catch (err) {
      alert('Não foi possível alterar os dados! Consulte o administrador.');
    }
  };
  
  const handleAtivar = async () => {
    try {
      const response = await axios.put('http://localhost:3000/usuarioModulo/ativarUsuarioModulo', {id});

      if (response.status === 200) {
        navigation.navigate('UsuarioModuloAdmin');
        alert(`Usuário modulo ativado com sucesso!`);
      }
    } catch(err) {
      alert("Não foi possível ativar o certificado! Consulte o administrador.");
    }
  }

  const handleDesativar = async () => {
    try {
        const response = await axios.put('http://localhost:3000/usuarioModulo/desativarUsuarioModulo', {id});

        if (response.status === 200) {
          navigation.navigate('UsuarioModuloAdmin');
          alert(`Usuario módulo desativado com sucesso!`);
        }
    } catch(err) {
        alert("Não foi possível deletar certificado! Consulte o administrador.");
    }
  };

  return (
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>EDITAR USUÁRIO MÓDULO</Text>
        </View>
      </View>

      <View style={Global.containerForm}>
        <Text style={Global.label}>Aprovado:</Text>
        <Switch
          value={aprovado}
          onValueChange={setAprovado}
        />

        <Text style={Global.label}>Iniciado:</Text>
        <Switch
          value={iniciado}
          onValueChange={setIniciado}
        />

        <Text style={Global.label}>Nota Final:</Text>
        <TextInput
          style={Global.input}
          placeholder="Nota Final (0-100)"
          value={notaFinal}
          onChangeText={setNotaFinal}
          keyboardType="numeric"
        />

        <TouchableOpacity onPress={handleSalvar} style={Global.salvar}>
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
