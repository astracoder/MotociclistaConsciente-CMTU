import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'UsuarioAddAdmin'>;

export const CertificadoAddAdmin = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { idUsuario } = route.params as { idUsuario: number };

  const [texto, setTexto] = useState('');
  const [horas, setHoras] = useState('');
  const [dataConclusao, setDataConclusao] = useState('');

  const handleCadastro = async () => {
    if (!texto || !horas || !dataConclusao) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/certificado/cadastro', {texto, horas, dataConclusao, idUsuario});

      if (response.status === 200) {
        navigation.navigate('CertificadoAdmin');
        alert(`Certificado cadastrado com sucesso!`);
      }
    } catch (err) {
      alert("Não foi possível cadastrar o certificado! Consulte o administrador.");
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
          <Text style={Global.nomeAba}>CADASTRAR CERTIFICADO</Text>
        </View>
      </View>

      <View style={Global.containerForm}>
        <Text style={Global.label}>Texto:</Text>
        <TextInput
          style={Global.input}
          placeholder="Digite o texto..."
          value={texto}
          onChangeText={setTexto}
        />
        <Text style={Global.label}>Horas</Text>
        <TextInput
          style={Global.input}
          placeholder="Digite as horas..."
          value={horas}
          onChangeText={setHoras}
        />
        <Text style={Global.label}>Data de conclusão:</Text>
        <TextInput
          style={Global.input}
          placeholder="Digite a data de conclusão..."
          value={dataConclusao}
          onChangeText={setDataConclusao}
        />

        <TouchableOpacity onPress={handleCadastro} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
