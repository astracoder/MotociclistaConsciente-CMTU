import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackParamList } from '../../../App';
import PerguntaStyles from '../../styles/Perguntas/PerguntasStyles.ts';

type PerguntaRouteProp = RouteProp<StackParamList, 'Perguntas'>;

export const Perguntas = () => {
  const route = useRoute<PerguntaRouteProp>();
  const { idModulo } = route.params;

  const [atividades, setAtividades] = useState<any[]>([]);
  const [alternativas, setAlternativas] = useState<any[]>([]);
  const [atividadeAtual, setAtividadeAtual] = useState<number>(0);
  const [alternativaSelecionada, setAlternativaSelecionada] = useState<number | null>(null); // Nova variável de estado
  const [acertos, setAcertos] = useState<number>(0);

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/atividade/selecionarAtividadesPorModulo?idModulo=${idModulo}`
        );
        setAtividades(response.data);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao buscar atividades.');
        console.error(error);
      }
    };

    const fetchAlternativas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/alternativa/selecionarAlternativas');
        setAlternativas(response.data);
      } catch (error) {
        Alert.alert('Erro ao buscar alternativas.');
        console.error(error);
      }
    };

    fetchAtividades();
    fetchAlternativas();
  }, [idModulo]);

  const alternativasAtividadeAtual = alternativas.filter(
    (alt) => alt.FK_ATIVIDADE_ID_ATIVIDADE === atividades[atividadeAtual]?.ID_ATIVIDADE
  );

  const handleProximaPergunta = () => {
    setAtividadeAtual((prev) => prev + 1);
    setAlternativaSelecionada(null);
  };

  return (
    <SafeAreaView style={PerguntaStyles.container}>
      {atividades.length > 0 ? (
        <>
          <Text style={PerguntaStyles.titulo}>
            {atividades[atividadeAtual]?.TEXTO}
          </Text>
          <View style={PerguntaStyles.alternativasContainer}>
            {alternativasAtividadeAtual.map((alt, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  PerguntaStyles.alternativa,
                  alternativaSelecionada === alt.ID_ALTERNATIVA && PerguntaStyles.alternativaSelecionada, 
                ]}
                onPress={() => {
                  setAlternativaSelecionada(alt.ID_ALTERNATIVA); 
                  if(alt.RESPOSTA_CERTA == 1) {
                    alert('Resposta correta!');
                    setAcertos((ac) => ac + 1);
                  } else {
                    alert('Resposta errada!');
                  };
                  console.log("Contador: " + acertos);
                }}
              >
                <Text style={PerguntaStyles.textoAlternativa}>{alt.TEXTO}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Botão para próxima pergunta */}
          {atividadeAtual < atividades.length - 1 && (
            <TouchableOpacity
              onPress={handleProximaPergunta}
              style={[
                PerguntaStyles.botaoProximo,
                !alternativaSelecionada && PerguntaStyles.botaoProximoDesabilitado, // Estilo desabilitado
              ]}
              disabled={!alternativaSelecionada} // Desabilita se nenhuma alternativa for selecionada
            >
              <Text style={PerguntaStyles.textoBotao}>Próxima</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <Text style={PerguntaStyles.titulo}>Carregando...</Text>
      )}
    </SafeAreaView>
  );
};
