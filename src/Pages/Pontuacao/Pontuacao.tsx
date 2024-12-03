import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../../App';
import { useUser } from '../../context/UserContext.js';
import PontuacaoStyles from '../../styles/Pontuacao/PontuacaoStyles';

//Tipagem da pagina TYPESCRIPT
type PontuacaoRouteProp = RouteProp<StackParamList, 'Pontuacao'>;

//Variaveis e funções do Menu
export const Pontuacao = () => {
  const route = useRoute<PontuacaoRouteProp>();
  const navigation = useNavigation();

  // user são os dados que foram setados pelo useUser na tela de Login, e pode ser usado aqui e em qualquer pagina.
  const { user } = useUser();

  // Puxei a informação da pontuação (nota) que vem da página anterior e exibe na tela
  const { pontuacao } = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={PontuacaoStyles.container}>
        <Text style={PontuacaoStyles.tituloParabens}>
          {pontuacao >= 60
            ? `Parabéns ${user.nome}, você finalizou o módulo com sucesso!`
            : `Você completou o módulo, mas precisa melhorar, ${user.nome}. Tente novamente!`}
        </Text>
        <Text style={PontuacaoStyles.tituloNota}>Nota: <Text style={PontuacaoStyles.pontuacao}>{pontuacao}<Text style={PontuacaoStyles.tituloNota}> pts</Text></Text></Text>
        <TouchableOpacity
              onPress={() => navigation.navigate('Modulos')}
              style={PontuacaoStyles.botaoProximo}
            >
              <Text 
                style={PontuacaoStyles.textoBotao}>Voltar</Text>
            </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};
