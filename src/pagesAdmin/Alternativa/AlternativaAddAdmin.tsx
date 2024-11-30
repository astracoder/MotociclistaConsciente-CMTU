import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert, Picker } from 'react-native';
import axios from 'axios';
import Global from '../../stylesAdmin/Global/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'AtividadeAddAdmin'>;

export const AlternativaAddAdmin = () => {
  const navigation = useNavigation<NavigationProps>();

  const [texto, setTexto] = useState('');
  const [modulos, setModulos] = useState([]);
  const [moduloSelecionado, setModuloSelecionado] = useState('');
  const [atividades, setAtividades] = useState([]);
  const [atividadeSelecionada, setAtividadeSelecionada] = useState('');
  const [isCorreta, setIsCorreta] = useState<number>(0);

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/modulo/selecionarModulos');
        if (response.status === 200) {
          setModulos(response.data);
        }
      } catch (err) {
        Alert.alert('Erro', 'Não foi possível carregar os módulos.');
      }
    };
    fetchModulos();
  }, []);

  useEffect(() => {
    if (!moduloSelecionado) {
      setAtividades([]);
      return;
    }

    const fetchAtividadesPorModulo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/atividade/selecionarAtividadesPorModulo?idModulo=${moduloSelecionado}`);
        if (response.status === 200) {
          setAtividades(response.data);
        }
      } catch (err) {
        Alert.alert('Não foi possível carregar as alternativas.');
      }
    };
    fetchAtividadesPorModulo();
  }, [moduloSelecionado]);

  const handleCadastro = async () => {
    if (!texto || !moduloSelecionado) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/alternativa/cadastro', {
        texto,
        respostaCerta: isCorreta,
        idAtividade: atividadeSelecionada
      }); 

      if (response.status === 200) {
        navigation.navigate('AlternativaAdmin');
        alert('Alternativa cadastrada com sucesso!');
      }
    } catch (err) {
      alert('Não foi possível cadastrar a alternativa! Consulte o administrador.');
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
          selectedValue={moduloSelecionado}
          onValueChange={(itemValue: any) => setModuloSelecionado(itemValue)}
          style={Global.input}
        >
          <Picker.Item label="Selecione um módulo" value=""/>
          {modulos.map((modulo: any) => (
            <Picker.Item key={modulo.id_modulo} label={modulo.nome} value={modulo.id_modulo} />
          ))}
        </Picker>

        <Text style={Global.label}>Selecione uma atividade:</Text>
        <Picker
          selectedValue={atividadeSelecionada}
          onValueChange={(itemValue: any) => setAtividadeSelecionada(itemValue)}
          style={Global.input}
        >
          <Picker.Item label="Selecione uma atividade" value=""/>
          {atividades.map((atividade: any) => (
            <Picker.Item key={atividade.ID_ATIVIDADE} label={`${atividade.ID_ATIVIDADE} - ${atividade.TEXTO}`} value={atividade.ID_ATIVIDADE} />
          ))}
        </Picker>
        

        <Text style={Global.label}>Digite o texto da atividade {`(pergunta)`}:</Text>
        <TextInput
          style={Global.input}
          placeholder="Texto..."
          value={texto}
          onChangeText={setTexto}
        />

        <Text style={Global.label}>Selecione se a alternativa é correta ou falsa:</Text>
        <Picker
          selectedValue={isCorreta}
          onValueChange={(itemValue: number) => setIsCorreta(itemValue)}
          style={Global.input}
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
