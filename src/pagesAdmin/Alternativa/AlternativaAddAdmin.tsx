import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert, Picker } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';  // Importando estilos globais definidos para a aplicação
import { useNavigation } from '@react-navigation/native'; // Hook para navegação entre telas
import { NativeStackNavigationProp } from '@react-navigation/native-stack';  // Tipagem para navegação com stack
import { StackParamList } from '../../../App';  // Importa os tipos de navegação da aplicação

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

// Tipando o parâmetro de navegação para garantir que a navegação está correta para a tela 'AtividadeAddAdmin'
type NavigationProps = NativeStackNavigationProp<StackParamList, 'AtividadeAddAdmin'>;

// Componente principal da tela para adicionar alternativas
export const AlternativaAddAdmin = () => {
  // Hook de navegação
  const navigation = useNavigation<NavigationProps>();

  // Declaração de estados para gerenciar os dados do formulário
  const [texto, setTexto] = useState('');  // Texto da alternativa (pergunta)
  const [modulos, setModulos] = useState([]);  // Lista de módulos recebidos da API
  const [moduloSelecionado, setModuloSelecionado] = useState('');  // Módulo selecionado
  const [atividades, setAtividades] = useState([]);  // Lista de atividades associadas ao módulo selecionado
  const [atividadeSelecionada, setAtividadeSelecionada] = useState('');  // Atividade selecionada
  const [isCorreta, setIsCorreta] = useState<number>(0);  // 0 para "Falsa" e 1 para "Correta"

  // Efeito para carregar os módulos da API ao carregar o componente
  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await axios.get(`http://${ipconfig}:3000/modulo/selecionarModulos`);
        if (response.status === 200) {
          setModulos(response.data);  // Armazena os módulos na variável de estado 'modulos'
        }
      } catch (err) {
        Alert.alert('Erro', 'Não foi possível carregar os módulos.');  // Exibe um alerta caso haja erro na requisição
      }
    };
    fetchModulos();  // Chama a função que carrega os módulos da API
  }, []);  // Esse efeito é executado uma vez quando o componente é montado

  // Efeito para carregar atividades baseadas no módulo selecionado
  useEffect(() => {
    if (!moduloSelecionado) {
      setAtividades([]);  // Reseta as atividades se nenhum módulo for selecionado
      return;
    }

    const fetchAtividadesPorModulo = async () => {
      try {
        const response = await axios.get(`http://${ipconfig}:3000/atividade/selecionarAtividadesPorModulo?idModulo=${moduloSelecionado}`);
        if (response.status === 200) {
          setAtividades(response.data);  // Armazena as atividades recebidas na variável de estado 'atividades'
        }
      } catch (err) {
        Alert.alert('Não foi possível carregar as alternativas.');  // Exibe um alerta caso haja erro ao carregar atividades
      }
    };
    fetchAtividadesPorModulo();  // Chama a função que carrega atividades do módulo selecionado
  }, [moduloSelecionado]);  // Esse efeito é executado toda vez que 'moduloSelecionado' muda

  // Função para cadastrar a alternativa
  const handleCadastro = async () => {
    if (!texto || !moduloSelecionado) {
      alert('Todos os campos são obrigatórios!');  // Verifica se os campos obrigatórios estão preenchidos
      return;
    }

    try {
      // Faz a requisição POST para cadastrar a alternativa
      const response = await axios.post(`http://${ipconfig}:3000/alternativa/cadastro`, {
        texto,  // Texto da alternativa
        respostaCerta: isCorreta,  // Se a alternativa é correta ou não
        idAtividade: atividadeSelecionada  // ID da atividade associada
      });

      if (response.status === 200) {
        navigation.navigate('AlternativaAdmin');  // Navega para a tela de administração de alternativas
        alert('Alternativa cadastrada com sucesso!');  // Exibe um alerta de sucesso
      }
    } catch (err) {
      alert('Não foi possível cadastrar a alternativa! Consulte o administrador.');  // Exibe um alerta caso haja erro
    }
  };

  return (
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>CADASTRAR ALTERNATIVA</Text>
        </View>
      </View>

      <View style={Global.containerForm}>
        <Text style={Global.label}>Selecione um módulo:</Text>
        <Picker
          selectedValue={moduloSelecionado}  // Valor selecionado
          onValueChange={(itemValue: any) => setModuloSelecionado(itemValue)}  // Atualiza o módulo selecionado
          style={Global.input}  // Estilo para o Picker
        >
          <Picker.Item label="Selecione um módulo" value="" />  
          {modulos.map((modulo: any) => (
            <Picker.Item key={modulo.id_modulo} label={modulo.nome} value={modulo.id_modulo} />
          ))}
        </Picker>

        <Text style={Global.label}>Selecione uma atividade:</Text>
        <Picker
          selectedValue={atividadeSelecionada}  // Valor selecionado
          onValueChange={(itemValue: any) => setAtividadeSelecionada(itemValue)}  // Atualiza a atividade selecionada
          style={Global.input}  // Estilo para o Picker
        >
          <Picker.Item label="Selecione uma atividade" value="" />
          {atividades.map((atividade: any) => (
            <Picker.Item key={atividade.ID_ATIVIDADE} label={`${atividade.TEXTO}`} value={atividade.ID_ATIVIDADE} /> 
          ))}
        </Picker>

        <Text style={Global.label}>Digite o texto da atividade {`(pergunta)`}:</Text>
        <TextInput
          style={Global.input}  // Estilo para o campo de texto
          placeholder="Texto..."  // Placeholder para indicar o que deve ser digitado
          value={texto}  // Valor do campo de texto
          onChangeText={setTexto}  // Atualiza o estado com o novo texto digitado
        />

        <Text style={Global.label}>Selecione se a alternativa é correta ou falsa:</Text>
        <Picker
          selectedValue={isCorreta}  // Valor selecionado
          onValueChange={(itemValue: number) => setIsCorreta(itemValue)}  // Atualiza se a alternativa é correta ou falsa
          style={Global.input}  // Estilo para o Picker
        >
          <Picker.Item label="Falsa" value={0} />
          <Picker.Item label="Correta" value={1} />
        </Picker>

        <TouchableOpacity onPress={handleCadastro} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Cadastrar</Text> 
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
