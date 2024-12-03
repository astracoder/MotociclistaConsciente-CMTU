import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/native';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'AlternativaAdmin'>;

export const AlternativaAdmin = () => {
  const navigation = useNavigation<NavigationProps>();
  
  const [dados, setDados] = useState<any[]>([]);

  const handleListarAlternativas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/alternativa/selecionarAlternativas');
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
    handleListarAlternativas();
  }, []);

  const obterNomeModulo = (idModulo: number) => {
    switch (idModulo) {
      case 1:
        return 'PEDESTRE';
      case 2:
        return 'ACIDENTES';
      case 3:
        return 'PLACAS';
      case 4:
        return 'LEGISLAÇÃO';
      case 5:
        return 'MECÂNICA';
      default:
        return 'Módulo Desconhecido';
    }
  };

  return (
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>

        <TouchableOpacity onPress={() => navigation.navigate('AtividadeAdmin')} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>ALTERNATIVA</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('CertificadoAdmin')} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⮕'}</Text>
        </TouchableOpacity>

      </View>
      
      <ScrollView style={Global.containerView}>
        {dados.map((item, index) => {
          const backgroundColor = Math.floor(index / 4) % 2 === 0 ? '#f0f0f0' : '#dcdcdc';
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AlternativaEditDeleteAdmin', {
                  id: item.ID_ALTERNATIVA,
                  status: item.STATUS,
                  texto: item.TEXTO,
                })
              }
              key={index}
              style={[Global.containerBoxInfo, { backgroundColor }, item.STATUS === 0 && Global.boxInativo]}
            >
              <View style={Global.containerID}>
                <Text style={Global.containerIDTexto}>{item.ID_ALTERNATIVA}</Text>
              </View>
              <View style={Global.containerNome}>
                <Text style={Global.containerNomeTexto}>{item.TEXTO}</Text>
              </View>
              <View style={Global.containerIDModulo}>
                <Text style={Global.containerIDModuloTexto}>
                  {obterNomeModulo(item.FK_MODULO_ID_MODULO)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity onPress={() => navigation.navigate('AlternativaAddAdmin')} style={Global.adicionar}>
        <Text style={{ fontSize: 34, textAlign: 'center', color: 'white' }}>+</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};
