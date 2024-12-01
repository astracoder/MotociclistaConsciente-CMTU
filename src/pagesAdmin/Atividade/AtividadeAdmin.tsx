import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/native';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'AtividadeAdmin'>;

export const AtividadeAdmin = () => {
  const navigation = useNavigation<NavigationProps>();

  const [dados, setDados] = useState<any[]>([]);

  const handleListarAtividades = async () => {
    try {
      const response = await axios.get('http://localhost:3000/atividade/selecionarAtividadesAtivo');
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
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>ATIVIDADE</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('AlternativaAdmin')} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⮕'}</Text>
        </TouchableOpacity>

      </View>
      
      <ScrollView style={Global.containerView}>
        {dados.map((item, index) => {
          const backgroundColor = Math.floor(index / 10) % 2 === 0 ? '#f0f0f0' : '#dcdcdc'; // Alterna a cor a cada 10 itens
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AtividadeEditDeleteAdmin', {
                  id: item.ID_ATIVIDADE,
                  texto: item.TEXTO,
                  fk_id: item.FK_MODULO_ID_MODULO,
                })
              }
              key={index}
              style={[Global.containerBoxInfo, { backgroundColor }]} // Aplica a cor dinamicamente
            >
              <View style={Global.containerID}>
                <Text style={Global.containerIDTexto}>{item.ID_ATIVIDADE}</Text>
              </View>
              <View style={Global.containerNome}>
                <Text style={Global.containerNomeTexto}>{item.TEXTO}</Text>
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
        <Text style={{ fontSize: 34, textAlign: 'center', color: 'white' }}>+</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};
