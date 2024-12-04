import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/native';

import { ipconfig } from '../../../ipConfig.js';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'AtividadeAdmin'>;

export const AtividadeAdmin = () => {
  const navigation = useNavigation<NavigationProps>();
  const [dados, setDados] = useState<any[]>([]);

  const handleListarAtividades = async () => {
    try {
      const response = await axios.get(`http://${ipconfig}:3000/atividade/selecionarAtividadesAdmin`);
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
    handleListarAtividades();
  }, []);

  return (
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        <TouchableOpacity onPress={() => navigation.navigate('UsuarioModuloAdmin')} style={Global.setas}>
          {/* Envolvendo o texto com <Text> */}
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>↞</Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>ATIVIDADE</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('AlternativaAdmin')} style={Global.setas}>
          {/* Envolvendo o texto com <Text> */}
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>↠</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={Global.containerView}>
        {dados.map((item, index) => {
          const backgroundColor = Math.floor(index / 10) % 2 === 0 ? '#f0f0f0' : '#dcdcdc';

          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AtividadeEditDeleteAdmin', {
                  id: item.ID_ATIVIDADE,
                  status: item.STATUS,
                  texto: item.TEXTO,
                  fk_id: item.FK_MODULO_ID_MODULO,
                })
              }
              key={index}
              style={[Global.containerBoxInfo, { backgroundColor }, item.STATUS === 0 && Global.boxInativo]}
            >
              <View style={Global.containerID}>
                <Text style={Global.containerIDTexto}>{item.ID_ATIVIDADE}</Text>
              </View>
              <View style={Global.containerNome}>
                <Text style={Global.containerNomeTexto}>{item.TEXTO.slice(0, 30)}...</Text>
              </View>
              <View style={Global.containerIDModulo}>
                <Text style={Global.containerIDModuloTexto}>
                  {item.FK_MODULO_ID_MODULO === 1
                    ? 'PEDESTRE'
                    : item.FK_MODULO_ID_MODULO === 2
                    ? 'ACIDENTES'
                    : item.FK_MODULO_ID_MODULO === 3
                    ? 'PLACAS'
                    : item.FK_MODULO_ID_MODULO === 4
                    ? 'LEGISLAÇÃO'
                    : item.FK_MODULO_ID_MODULO === 5
                    ? 'MECÂNICA'
                    : ''}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity onPress={() => navigation.navigate('AtividadeAddAdmin')} style={Global.adicionar}>
        {/* Envolvendo o texto com <Text> */}
        <Text style={{ fontSize: 34, textAlign: 'center', color: 'white' }}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
