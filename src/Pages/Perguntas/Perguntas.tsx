import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { StackParamList } from '../../../App';
import { useUser } from '../../context/UserContext.js';
import PerguntaStyles from '../../styles/Perguntas/PerguntasStyles.ts';

type PerguntaRouteProp = RouteProp<StackParamList, 'Perguntas'>;

export const Perguntas = () => {
  const route = useRoute<PerguntaRouteProp>();
  const { idModulo } = route.params;
  const { user } = useUser();
  const idUsuario = user.id_usuario;

  const navigation = useNavigation(); 

  const [atividades, setAtividades] = useState<any[]>([]);
  const [alternativas, setAlternativas] = useState<any[]>([]);
  const [atividadeAtual, setAtividadeAtual] = useState<number>(0);
  const [alternativaSelecionada, setAlternativaSelecionada] = useState<number | null>(null);
  const [acertos, setAcertos] = useState<number>(0);
  const [respostaCerta, setRespostaCerta] = useState<number>();

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/atividade/selecionarAtividadesPorModulo?idModulo=${idModulo}`);
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
        alert('Erro ao buscar alternativas.');
        console.error(error);
      }
    };

    fetchAtividades();
    fetchAlternativas();
  }, [idModulo]);

  const alternativasAtividadeAtual = alternativas.filter(
    (alt) => alt.FK_ATIVIDADE_ID_ATIVIDADE === atividades[atividadeAtual]?.ID_ATIVIDADE
  );

  const handleProximaPergunta = async () => {
    setAtividadeAtual((prev) => prev + 1);
    setAlternativaSelecionada(null);

    const idAtividadeAtual = atividades[atividadeAtual]?.ID_ATIVIDADE;

    if(respostaCerta === 1) {
      await axios.post('http://localhost:3000/atividade/acertar', { idAtividadeAtual });
    } else {
      await axios.post('http://localhost:3000/atividade/errar', { idAtividadeAtual });
    }
  };

  const handleFinalizar = async () => {
     try {
      const idAtividadeAtual = atividades[atividadeAtual]?.ID_ATIVIDADE;

      if(respostaCerta === 1 ? 1 : 0) {
        await axios.post('http://localhost:3000/atividade/acertar', { idAtividadeAtual });
      } else {
        await axios.post('http://localhost:3000/atividade/errar', { idAtividadeAtual });
      }

      const response = await axios.get(`http://localhost:3000/modulo/selecionarPorcentagemModuloAtual?idModulo=${idModulo}`);
      const porcentagemModuloAtual = response.data[0].porcentagem_necessaria;
      
      const resultadoPorcentagem = (acertos + (respostaCerta === 1 ? 1 : 0)) / atividades.length * 100; // Ele pega o valor do ultimo clique da resposta e acrescenta +1 no valor de acertos!
      
      if(resultadoPorcentagem >= porcentagemModuloAtual) {
        await axios.post(`http://localhost:3000/usuarioModulo/definirNotaAprovado`, 
          {nota_final: resultadoPorcentagem, idUsuario, idModulo}
        );
        console.log("Aprovado no banco!");
      } else {
        await axios.post(`http://localhost:3000/usuarioModulo/definirNota`, 
          {nota_final: resultadoPorcentagem, idUsuario, idModulo}
        );
        console.log("Reprovado!");
      }

      navigation.navigate('Pontuacao', { pontuacao: resultadoPorcentagem });

    } catch(err) {
      alert('Erro ao buscar módulo!');
    }
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
                  setRespostaCerta(alt.RESPOSTA_CERTA);
                }}
              >
                <Text style={PerguntaStyles.textoAlternativa}>{alt.TEXTO}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {atividadeAtual < atividades.length - 1 ? (
            <TouchableOpacity
              onPress={() => {
                handleProximaPergunta();
                if (respostaCerta == 1) {
                  setAcertos((ac) => ac + 1);
                }
              }}
              style={[
                PerguntaStyles.botaoProximo,
                !alternativaSelecionada && PerguntaStyles.botaoProximoDesabilitado,
              ]}
              disabled={!alternativaSelecionada}
            >
              <Text style={PerguntaStyles.textoBotao}>Próxima</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleFinalizar}
              style={PerguntaStyles.botaoProximo}
            >
              <Text style={PerguntaStyles.textoBotao}>Finalizar</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <Text style={PerguntaStyles.titulo}>Carregando...</Text>
      )}
    </SafeAreaView>
  );
};
