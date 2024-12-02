import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../../App';
import { useUser } from '../../context/UserContext.js';
import PontuacaoStyles from '../../styles/Pontuacao/PontuacaoStyles';

type PontuacaoRouteProp = RouteProp<StackParamList, 'Pontuacao'>;

export const Pontuacao = () => {
  const route = useRoute<PontuacaoRouteProp>();
  const navigation = useNavigation();

  const { user } = useUser();
  const { pontuacao } = route.params;

  return (
    <SafeAreaView>
      <View style={PontuacaoStyles.container}>
        <Text style={PontuacaoStyles.tituloParabens}>Parabéns {user.nome}, você finalizou o módulo com sucesso.</Text>
        <Text style={PontuacaoStyles.tituloNota}>Nota: <Text style={PontuacaoStyles.pontuacao}>{pontuacao}<Text style={PontuacaoStyles.tituloNota}> pts</Text></Text></Text>
        <TouchableOpacity
              onPress={() => navigation.navigate('Modulos')}
              style={PontuacaoStyles.botaoProximo}
            >
              <Text 
                style={PontuacaoStyles.textoBotao}>Voltar</Text>
            </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
