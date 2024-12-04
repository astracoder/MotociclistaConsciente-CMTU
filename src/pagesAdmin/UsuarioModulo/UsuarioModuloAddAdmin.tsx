// Importação das dependências necessárias para o componente.
import React, { useState, useEffect } from 'react'; // Importa o React e hooks useState e useEffect.
import { Text, View, TouchableOpacity, SafeAreaView, Alert, Picker } from 'react-native'; // Importa componentes necessários do React Native.
import axios from 'axios'; // Importa o axios para fazer requisições HTTP.
import Global from '../../stylesAdmin/Global/globalStyles'; // Importa os estilos globais do projeto.
import { useNavigation } from '@react-navigation/native'; // Hook para navegação entre telas.
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Tipagem para navegação com a stack.
import { StackParamList } from '../../../App'; // Tipo da lista de parâmetros das telas da aplicação.

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'AtividadeAddAdmin'>; // Tipagem para navegação para a tela 'AtividadeAddAdmin'.

// Componente principal para adicionar um usuário a um módulo.
export const UsuarioModuloAddAdmin = () => {
  const navigation = useNavigation<NavigationProps>(); // Hook de navegação para ir entre as telas.

  // Estados locais para armazenar os usuários, módulos e os itens selecionados pelo usuário.
  const [usuarios, setUsuarios] = useState([]); // Armazena a lista de usuários.
  const [modulos, setModulos] = useState([]); // Armazena a lista de módulos.
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(''); // Armazena o usuário selecionado.
  const [moduloSelecionado, setModuloSelecionado] = useState(''); // Armazena o módulo selecionado.

  // useEffect para carregar os dados de usuários ao montar o componente.
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        // Requisição GET para obter a lista de usuários da API.
        const response = await axios.get(`http://${ipconfig}:3000/usuario/selecionarUsuarios`);
        if (response.status === 200) {
          setUsuarios(response.data); // Atualiza o estado com os usuários recebidos.
        }
      } catch (err) {
        // Caso ocorra erro na requisição, exibe um alerta.
        Alert.alert('Erro', 'Não foi possível carregar os usuários.');
      }
    };
    fetchUsuarios(); // Chama a função para carregar os usuários.
  }, []); // O array vazio indica que essa requisição será feita apenas uma vez ao carregar o componente.

  // useEffect para carregar os dados de módulos ao montar o componente.
  useEffect(() => {
    const fetchModulos = async () => {
      try {
        // Requisição GET para obter a lista de módulos da API.
        const response = await axios.get(`http://${ipconfig}:3000/modulo/selecionarModulos`);
        if (response.status === 200) {
          setModulos(response.data); // Atualiza o estado com os módulos recebidos.
        }
      } catch (err) {
        // Caso ocorra erro na requisição, exibe um alerta.
        Alert.alert('Erro', 'Não foi possível carregar os módulos.');
      }
    };
    fetchModulos(); // Chama a função para carregar os módulos.
  }, []); // O array vazio indica que essa requisição será feita apenas uma vez ao carregar o componente.

  // Função para tratar o cadastro do usuário no módulo.
  const handleCadastro = async () => {
    // Verifica se o usuário e o módulo foram selecionados.
    if (!usuarioSelecionado || !moduloSelecionado) {
      alert('Todos os campos são obrigatórios!'); // Exibe um alerta caso algum campo não tenha sido preenchido.
      return;
    }

    try {
      // Envia uma requisição POST para cadastrar a associação do usuário com o módulo.
      const response = await axios.post(`http://${ipconfig}:3000/usuarioModulo/cadastro`, {
        idUsuario: usuarioSelecionado, // ID do usuário selecionado.
        idModulo: moduloSelecionado, // ID do módulo selecionado.
      });

      // Verifica se a resposta foi bem-sucedida (status 200).
      if (response.status === 200) {
        navigation.navigate('AlternativaAdmin'); // Navega para a tela de alternativas de administração.
        alert('Usuário módulo cadastrado com sucesso!'); // Exibe uma mensagem de sucesso.
      }
    } catch (err) {
      // Caso ocorra erro durante a requisição, exibe uma mensagem de erro.
      alert('Não foi possível cadastrar o usuário módulo! Consulte o administrador.');
    }
  };

  return (
    // SafeAreaView garante que o conteúdo ficará dentro da área segura, evitando sobreposição de elementos em dispositivos com notch.
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'↞'}</Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>CADASTRAR USUÁRIO MÓDULO</Text>
        </View>
      </View>

      <View style={Global.containerForm}>
        <Text style={Global.label}>Selecione um usuário:</Text>
        <Picker
          selectedValue={usuarioSelecionado} // Valor do usuário selecionado.
          onValueChange={(itemValue: any) => setUsuarioSelecionado(itemValue)} // Atualiza o valor selecionado no estado.
          style={Global.input}
        >
          <Picker.Item label="Usuários..." value="" />
          {usuarios.map((usuario: any) => (
            <Picker.Item key={usuario.id_usuario} label={usuario.nome} value={usuario.id_usuario} />
          ))}
        </Picker>

        <Text style={Global.label}>Selecione um módulo:</Text>
        <Picker
          selectedValue={moduloSelecionado} // Valor do módulo selecionado.
          onValueChange={(itemValue: any) => setModuloSelecionado(itemValue)} // Atualiza o valor selecionado no estado.
          style={Global.input}
        >
          <Picker.Item label="Módulos..." value="" />
          {modulos.map((modulo: any) => (
            <Picker.Item key={modulo.id_modulo} label={modulo.nome} value={modulo.id_modulo} />
          ))}
        </Picker>

        <TouchableOpacity onPress={handleCadastro} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
