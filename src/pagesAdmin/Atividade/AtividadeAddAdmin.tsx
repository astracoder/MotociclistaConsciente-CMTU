import React, { useState, useEffect } from 'react';  // Importação do React e dos hooks useState e useEffect
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert, Picker } from 'react-native';  // Importação dos componentes do React Native
import axios from 'axios';  // Importação do axios para fazer requisições HTTP
import Global from '../../stylesAdmin/Global/globalStyles';  // Importação dos estilos globais definidos para a aplicação
import { useNavigation } from '@react-navigation/native';  // Hook de navegação para navegar entre as telas
import { NativeStackNavigationProp } from '@react-navigation/native-stack';  // Tipagem para navegação com stack
import { StackParamList } from '../../../App';  // Importação dos tipos de navegação definidos no App.tsx

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

// Tipagem para o parâmetro de navegação para garantir que a navegação esteja correta para a tela 'AtividadeAddAdmin'
type NavigationProps = NativeStackNavigationProp<StackParamList, 'AtividadeAddAdmin'>;

// Componente principal para adicionar uma nova atividade
export const AtividadeAddAdmin = () => {
  const navigation = useNavigation<NavigationProps>();  // Hook de navegação para navegar entre as telas

  // Estados para armazenar os dados do formulário
  const [texto, setTexto] = useState('');  // Estado para armazenar o texto da atividade
  const [modulos, setModulos] = useState([]);  // Estado para armazenar os módulos recebidos da API
  const [moduloSelecionado, setModuloSelecionado] = useState('');  // Estado para armazenar o módulo selecionado no Picker

  // Hook useEffect para buscar os módulos disponíveis ao carregar o componente
  useEffect(() => {
    const fetchModulos = async () => {
      try {
        // Requisição GET para buscar os módulos disponíveis
        const response = await axios.get(`http://${ipconfig}:3000/modulo/selecionarModulos`);
        if (response.status === 200) {  // Se a resposta for bem-sucedida
          setModulos(response.data);  // Armazena os módulos no estado
        }
      } catch (err) {  // Em caso de erro na requisição
        Alert.alert('Erro', 'Não foi possível carregar os módulos.');  // Exibe um alerta de erro
      }
    };
    fetchModulos();  // Chama a função para buscar os módulos ao carregar o componente
  }, []);  // O array vazio significa que o efeito é executado apenas uma vez, ao montar o componente

  // Função para cadastrar a nova atividade
  const handleCadastro = async () => {
    // Verifica se os campos obrigatórios (texto e módulo) foram preenchidos
    if (!texto || !moduloSelecionado) {
      alert('Todos os campos são obrigatórios!');  // Exibe um alerta caso algum campo esteja vazio
      return;
    }

    try {
      // Requisição POST para cadastrar a nova atividade
      const response = await axios.post(`http://${ipconfig}:3000/atividade/cadastro`, {
        texto,
        idModulo: moduloSelecionado,  // Envia o texto da atividade e o id do módulo selecionado
      }); 

      if (response.status === 200) {  // Se a resposta for bem-sucedida
        navigation.navigate('AtividadeAdmin');  // Navega para a tela de administração de atividades
        alert('Atividade cadastrada com sucesso!');  // Exibe um alerta de sucesso
      }
    } catch (err) {  // Em caso de erro na requisição
      alert('Não foi possível cadastrar a atividade! Consulte o administrador.');  // Exibe um alerta de erro
    }
  };

  return (
    <SafeAreaView style={Global.container}> 
      <View style={Global.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text> 
        </TouchableOpacity>

        <View style={Global.containerAba}> 
          <Text style={Global.nomeAba}>CADASTRAR ATIVIDADE</Text> 
        </View>
      </View>

      <View style={Global.containerForm}> 
        <Text style={Global.label}>Selecione um módulo:</Text> 
        
        <Picker
          selectedValue={moduloSelecionado}  // O valor selecionado é o estado 'moduloSelecionado'
          onValueChange={(itemValue: any) => setModuloSelecionado(itemValue)}  // Atualiza o estado 'moduloSelecionado' quando o valor mudar
          style={Global.input}  // Estilo do Picker
        >
          <Picker.Item label="Módulos..." value=""/>
          {modulos.map((modulo: any) => (  // Mapeia os módulos recebidos da API
            <Picker.Item key={modulo.id_modulo} label={modulo.nome} value={modulo.id_modulo} />
          ))}
        </Picker>

        <Text style={Global.label}>Digite o texto da atividade {`(pergunta)`}:</Text> 
        
        <TextInput
          style={Global.input}  // Estilo do campo de entrada
          placeholder="Texto..."  // Texto de dica para o campo
          value={texto}  // O valor do campo é o estado 'texto'
          onChangeText={setTexto}  // Atualiza o estado 'texto' quando o texto mudar
        />

        {/* Botão para cadastrar a atividade */}
        <TouchableOpacity onPress={handleCadastro} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
