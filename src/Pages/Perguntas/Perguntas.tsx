import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { StackParamList } from '../../../App';
import { useUser } from '../../context/UserContext.js';
import PerguntaStyles from '../../styles/Perguntas/PerguntasStyles.ts';

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

// Tipagem da pagina TYPESCRIPT
type PerguntaRouteProp = RouteProp<StackParamList, 'Perguntas'>;

// Variaveis e funções do Menu
export const Perguntas = () => {
  const route = useRoute<PerguntaRouteProp>();

  // Resgatando o ID do módulo da pagina anterior
  const { idModulo } = route.params;

  // user são os dados que foram setados pelo useUser na tela de Login, e pode ser usado aqui e em qualquer pagina.
  const { user } = useUser();

  // Pegando o ID do usuário do useUser (Context API)
  const idUsuario = user.id_usuario;

  const navigation = useNavigation(); 

  // Variaveis que armazenam as atividades, alternativas, atividades selecionadas no PICKER e também as alternativas
  const [atividades, setAtividades] = useState<any[]>([]);
  const [alternativas, setAlternativas] = useState<any[]>([]);
  const [atividadeAtual, setAtividadeAtual] = useState<number>(0);
  const [alternativaSelecionada, setAlternativaSelecionada] = useState<number | null>(null);

  // Acrescenta os acertos do usuário em relação as perguntas
  const [acertos, setAcertos] = useState<number>(0);
  const [respostaCerta, setRespostaCerta] = useState<number>();

  const handleProximaPergunta = async () => {
    // Atualiza o índice da atividade atual, passando para a próxima pergunta
    setAtividadeAtual((prev) => prev + 1);
  
    // Reseta a alternativa selecionada para garantir que o usuário não fique com uma seleção anterior
    setAlternativaSelecionada(null);
  
    // Obtém o ID da atividade atual, baseado no índice da atividade atual
    const idAtividadeAtual = atividades[atividadeAtual]?.ID_ATIVIDADE;
  
    // Se a resposta foi correta (respostaCerta === 1), envia o ID da atividade com o status "acertou"
    if(respostaCerta === 1) {
      await axios.post('http://localhost:3000/atividade/acertar', { idAtividadeAtual });
    } else {
      // Se a resposta foi incorreta, envia o ID da atividade com o status "errou"
      await axios.post('http://localhost:3000/atividade/errar', { idAtividadeAtual });
    }
  };

  useEffect(() => {
    // Função assíncrona para buscar atividades relacionadas a um módulo específico
    const fetchAtividades = async () => {
      try {
        // Faz uma requisição GET para a API buscando atividades pelo ID do módulo
        const response = await axios.get(
          `http://${ipconfig}:3000/atividade/selecionarAtividadesPorModulo?idModulo=${idModulo}`
        );
        // Atualiza o estado com as atividades retornadas pela API
        setAtividades(response.data);
      } catch (error) {
        // Exibe um alerta em caso de erro e imprime o erro no console
        Alert.alert('Erro', 'Erro ao buscar atividades.');
        console.error(error);
      }
    };
  
    // Função assíncrona para buscar todas as alternativas disponíveis
    const fetchAlternativas = async () => {
      try {
        // Faz uma requisição GET para a API para buscar alternativas
        const response = await axios.get(`http://${ipconfig}:3000/alternativa/selecionarAlternativas`);
        // Atualiza o estado com as alternativas retornadas pela API
        setAlternativas(response.data);
      } catch (error) {
        // Exibe um alerta simples e imprime o erro no console em caso de falha
        Alert.alert('Erro ao buscar alternativas.');
        console.error(error);
      }
    };
  
    // Executa ambas as funções ao montar o componente ou ao alterar o ID do módulo
    fetchAtividades();
    fetchAlternativas();
  }, [idModulo]); // Dependência do useEffect: será reexecutado sempre que `idModulo` mudar
  

  // Filtra as alternativas para pegar apenas aquelas que estão associadas à atividade atual.
  const alternativasAtividadeAtual = alternativas.filter((alt) => 
      // Verifica se o ID da atividade associada à alternativa é igual ao ID da atividade atual
      alt.FK_ATIVIDADE_ID_ATIVIDADE === atividades[atividadeAtual]?.ID_ATIVIDADE
      // Esse alt representa uma alternativa do array alternativas
      // A comparação verifica se a atividade da alternativa corresponde à atividade atualmente selecionada.
  );

  const handleFinalizar = async () => {
    try {
      // Obtém o ID da atividade atual, similar ao anterior
      const idAtividadeAtual = atividades[atividadeAtual]?.ID_ATIVIDADE;
  
      // Se a resposta foi correta, envia para marcar como acertar = 1, caso contrário, marca como errar = 0
      if(respostaCerta === 1 ? 1 : 0) {
        await axios.post(`http://${ipconfig}:3000/atividade/acertar`, { idAtividadeAtual });
      } else {
        await axios.post(`http://${ipconfig}:3000/atividade/errar`, { idAtividadeAtual });
      }
  
      // Requisição para obter a porcentagem necessária para aprovação no módulo atual
      const response = await axios.get(`http://${ipconfig}:3000/modulo/selecionarPorcentagemModuloAtual?idModulo=${idModulo}`);
      const porcentagemModuloAtual = response.data[0].porcentagem_necessaria;
      
      // Calcula a porcentagem de acertos do usuário
      const resultadoPorcentagem = (acertos + (respostaCerta === 1 ? 1 : 0)) / atividades.length * 100; // Esse respostaCerta ===1 ? 1 : 0 é apenas para computar o acerto da ultima questão.
  
      // Se a porcentagem de acertos for maior ou igual à porcentagem necessária, marca o usuário como aprovado
      if(resultadoPorcentagem >= porcentagemModuloAtual) {
        await axios.post(`http://${ipconfig}:3000/usuarioModulo/definirNotaAprovado`, 
          {nota_final: resultadoPorcentagem, idUsuario, idModulo}
        );
      } else {
        // Se não atingir a porcentagem necessária, marca o usuário como reprovado
        await axios.post(`http://${ipconfig}:3000/usuarioModulo/definirNota`, 
          {nota_final: resultadoPorcentagem, idUsuario, idModulo}
        );
      }
  
      // Navega para a tela de pontuação com a porcentagem do usuário
      navigation.navigate('Pontuacao', { pontuacao: resultadoPorcentagem });
  
    } catch(err) {
      // Se ocorrer um erro, exibe um alerta
      Alert.alert('Erro ao buscar módulo!');
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
