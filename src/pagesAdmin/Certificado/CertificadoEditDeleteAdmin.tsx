import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'UsuarioAddAdmin'>;

export const CertificadoEditDeleteAdmin  = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  
  const { id, status, texto: textoInicial, horas: horasInicial, data_conclusao: dataConclusao } = route.params as {
    id: number;
    status: number;
    texto: string,
    horas: number;
    data_conclusao: Date;
  };

  console.log(status);

  const [texto, setTexto] = useState(textoInicial);
  const [horas, setHoras] = useState(horasInicial);
  const [data_conclusao, setDataConclusao] = useState(dataConclusao);

  const handleSalvar = async () => {
    if (!texto || !horas || !data_conclusao) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    try {
        const response = await axios.put('http://localhost:3000/certificado/editarCertificado', {id, texto, horas, data_conclusao});
  
        if (response.status === 200) {
          navigation.navigate('CertificadoAdmin');
          alert(`Os dados foram alterados com sucesso!`);
        }
      } catch(err) {
        alert("Não foi possível alterar os dados! Consulte o administrador.");
        return;
      }
  };

  const handleAtivar = async () => {
    try {
      const response = await axios.put('http://localhost:3000/certificado/ativarCertificado', {id});

      if (response.status === 200) {
        navigation.navigate('CertificadoAdmin');
        alert(`Certificado ativado com sucesso!`);
      }
    } catch(err) {
      alert("Não foi possível ativar o certificado! Consulte o administrador.");
    }
  }

  const handleDesativar = async () => {
    try {
        const response = await axios.put('http://localhost:3000/certificado/desativarCertificado', {id});

        if (response.status === 200) {
          navigation.navigate('CertificadoAdmin');
          alert(`Certificado desativado com sucesso!`);
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
          <Text style={Global.nomeAba}>INFORMAÇÕES DO CERTIFICADO</Text>
        </View>
      </View>

      <View style={Global.containerForm}>
      <Text style={Global.label}>Edite o texto:</Text>
        <TextInput
          style={Global.input}
          placeholder="Texto..."
          value={texto}
          onChangeText={setTexto}
        />

        <Text style={Global.label}>Edite as horas:</Text>
        <TextInput
          style={Global.input}
          placeholder="Horas..."
          value={horas}
          onChangeText={setHoras}
        />

        <Text style={Global.label}>Edite a data de conclusão:</Text>
        <TextInput
          style={Global.input}
          placeholder="Data de conclusão (YY/MM/DD)..."
          value={dataConclusao}
          onChangeText={setDataConclusao}
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
