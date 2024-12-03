import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, Alert, Picker } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'AtividadeAddAdmin'>;

export const UsuarioModuloAddAdmin = () => {
  const navigation = useNavigation<NavigationProps>();

  const [usuarios, setUsuarios] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
  const [moduloSelecionado, setModuloSelecionado] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/usuario/selecionarUsuarios');
        if (response.status === 200) {
          setUsuarios(response.data);
        }
      } catch (err) {
        Alert.alert('Erro', 'Não foi possível carregar os usuários.');
      }
    };
    fetchUsuarios();
  }, []);

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/modulo/selecionarModulos');
        if (response.status === 200) {
          setModulos(response.data);
        }
      } catch (err) {
        Alert.alert('Erro', 'Não foi possível carregar os módulos.');
      }
    };
    fetchModulos();
  }, []);

  const handleCadastro = async () => {
    if (!usuarioSelecionado || !moduloSelecionado) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/usuarioModulo/cadastro', {
        idUsuario: usuarioSelecionado,
        idModulo: moduloSelecionado,
      });

      if (response.status === 200) {
        navigation.navigate('AlternativaAdmin');
        alert('Usuário módulo cadastrado com sucesso!');
      }
    } catch (err) {
      alert('Não foi possível cadastrar o usuário módulo! Consulte o administrador.');
    }
  };

  return (
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>CADASTRAR USUÁRIO MÓDULO</Text>
        </View>
      </View>

      <View style={Global.containerForm}>
        <Text style={Global.label}>Selecione um usuário:</Text>
        <Picker
          selectedValue={usuarioSelecionado}
          onValueChange={(itemValue: any) => setUsuarioSelecionado(itemValue)}
          style={Global.input}
        >
          <Picker.Item label="Usuários..." value="" />
          {usuarios.map((usuario: any) => (
            <Picker.Item key={usuario.id_usuario} label={usuario.nome} value={usuario.id_usuario} />
          ))}
        </Picker>

        <Text style={Global.label}>Selecione um módulo:</Text>
        <Picker
          selectedValue={moduloSelecionado}
          onValueChange={(itemValue: any) => setModuloSelecionado(itemValue)}
          style={Global.input}
        >
          <Picker.Item label="Módulos..." value="" />
          {modulos.map((modulo: any) => (
            <Picker.Item key={modulo.id_modulo} label={modulo.nome} value={modulo.id_modulo} />
          ))}
        </Picker>

        <TouchableOpacity onPress={handleCadastro} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
