import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert, Picker } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'AtividadeAddAdmin'>;

export const AtividadeAddAdmin = () => {
  const navigation = useNavigation<NavigationProps>();

  const [texto, setTexto] = useState('');
  const [modulos, setModulos] = useState([]);
  const [moduloSelecionado, setModuloSelecionado] = useState('');

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await axios.get('http://192.168.1.126:3000/modulo/selecionarModulos');
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
    if (!texto || !moduloSelecionado) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.126:3000/atividade/cadastro', {
        texto,
        idModulo: moduloSelecionado,
      }); 

      if (response.status === 200) {
        navigation.navigate('AtividadeAdmin');
        alert('Atividade cadastrada com sucesso!');
      }
    } catch (err) {
      alert('Não foi possível cadastrar a atividade! Consulte o administrador.');
    }
  };

  return (
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>CADASTRAR ATIVIDADE</Text>
        </View>
      </View>

      <View style={Global.containerForm}>
        <TextInput
          style={Global.input}
          placeholder="Texto da atividade"
          value={texto}
          onChangeText={setTexto}
        />

        <Picker
          selectedValue={moduloSelecionado}
          onValueChange={(itemValue: any) => setModuloSelecionado(itemValue)}
          style={Global.input}
        >
          <Picker.Item label="Selecione um módulo" value=""/>
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
