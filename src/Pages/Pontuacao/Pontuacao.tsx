import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackParamList } from '../../../App';
import PontuacaoStyles from '../../styles/Pontuacao/PontuacaoStyles';

type PontuacaoRouteProp = RouteProp<StackParamList, 'Pontuacao'>;

export const Pontuacao = () => {
  const route = useRoute<PontuacaoRouteProp>();
  // const { pontuacao } = route.params;

  return (
    <SafeAreaView>
      <View style={PontuacaoStyles.container}>
        <Text style={PontuacaoStyles.tituloParabens}>Parabéns, você finalizou o módulo de Pedestres com sucesso.</Text>
        <Text style={PontuacaoStyles.titulo}>Sua Pontuação:</Text>
        <Text style={PontuacaoStyles.titulo}>Nota: <Text style={PontuacaoStyles.pontuacao}>10</Text></Text>
      </View>
    </SafeAreaView>
  );
};
