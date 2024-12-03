import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/native';
import { ipconfig } from '../../../ipConfig.js';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'AlternativaAdmin'>;

export const CertificadoAdmin = () => {
  const navigation = useNavigation<NavigationProps>();
  const [dados, setDados] = useState<any[]>([]);

  const handleListarUsuarios = async () => {
    try {
      const response = await axios.get(`http://${ipconfig}:3000/certificado/selecionarCertificadosComUsuario`);
      const json = response.data;

      if (Array.isArray(json)) {
        setDados(json);
      } else {
        console.warn('A resposta da API não é um array:', json);
        setDados([]);
      }
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  useEffect(() => {
    handleListarUsuarios();
  }, []);

  return (
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>

        {/* Botão para navegar para a tela anterior */}
        <TouchableOpacity onPress={() => navigation.navigate('AlternativaAdmin')} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>⬅</Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>CERTIFICADO</Text>
        </View>

        {/* Botão para navegar para a próxima tela */}
        <TouchableOpacity onPress={() => navigation.navigate('DataScienceAdmin')} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>⮕</Text>
        </TouchableOpacity>

      </View>
      
      <ScrollView style={Global.containerView}>
        {dados.map((item, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CertificadoEditDeleteAdmin', {
                id: item.ID_CERTIFICADO,
                status: item.STATUS,
                texto: item.TEXTO,
                horas: item.HORAS,
                dataConclusao: item.DATA_CONCLUSAO,
              })
            }
            key={index}
            style={[Global.containerBoxInfo, item.STATUS === 0 && Global.boxInativo]}
          >
            <View style={Global.containerID}>
              <Text style={Global.containerIDTexto}>{item.ID_CERTIFICADO}</Text>
            </View>
            <View style={Global.containerNome}>
              <Text style={Global.containerNomeTexto}>{item.NOME_USUARIO}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('CertificadoAddAdmin', { idUsuario: dados[0]?.ID_USUARIO })}
        style={Global.adicionar}
      >
        <Text style={{ fontSize: 34, textAlign: 'center', color: 'white' }}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
