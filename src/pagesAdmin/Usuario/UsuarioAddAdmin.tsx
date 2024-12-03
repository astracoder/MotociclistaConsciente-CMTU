// Importação das dependências necessárias para o componente.
import React, { useState } from 'react'; // Importa o React e useState para o controle de estado.
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native'; // Importa componentes do React Native para construir a interface.
import axios from 'axios'; // Importa axios para fazer requisições HTTP.
import Global from '../../stylesAdmin/Global/globalStyles'; // Importa os estilos globais do projeto.
import { useNavigation } from '@react-navigation/native'; // Hook de navegação para a navegação entre telas.
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Tipagem da navegação stack.
import { StackParamList } from '../../../App'; // Tipo de lista de parâmetros das telas da aplicação.

// Aqui está uma variavel global, para eu mudar entre o IP da maquina e localhost
import { ipconfig } from '../../../ipConfig.js';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'UsuarioAddAdmin'>; // Tipagem do parâmetro de navegação para esta tela específica.

export const UsuarioAddAdmin = () => {
  // Obtém a função de navegação para navegar entre as telas.
  const navigation = useNavigation<NavigationProps>();

  // Estados para armazenar os dados inseridos no formulário (nome, email, senha).
  const [nome, setNome] = useState(''); // Estado para o nome do usuário.
  const [email, setEmail] = useState(''); // Estado para o e-mail do usuário.
  const [senha, setSenha] = useState(''); // Estado para a senha do usuário.

  // Função que lida com o cadastro do usuário.
  const handleCadastro = async () => {
    // Verificação de campos obrigatórios: se algum campo estiver vazio, exibe um alerta.
    if (!nome || !email || !senha) {
      alert('Todos os campos são obrigatórios!');
      return; // Retorna se algum campo estiver vazio, evitando o envio da requisição.
    }

    try {
      // Envia uma requisição POST para cadastrar o usuário com os dados informados.
      const response = await axios.post(`http://${ipconfig}:3000/usuario/cadastro`, {nome, email, senha});

      // Verifica se a requisição foi bem-sucedida (status 200), e navega para a tela de administração de usuários.
      if (response.status === 200) {
        navigation.navigate('UsuarioAdmin'); // Navega para a tela de administração de usuários após cadastro.
        alert(`Usuário cadastrado com sucesso!`); // Exibe um alerta de sucesso.
      }
    } catch (err) {
      // Se ocorrer um erro durante a requisição, exibe um alerta com a mensagem de erro.
      alert("Não foi possível cadastrar o usuário! Consulte o administrador.");
      return; // Retorna caso haja um erro.
    }
  };

  return (
    // SafeAreaView garante que o conteúdo da tela seja exibido dentro da área visível em dispositivos com notch ou bordas arredondadas.
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        {/* Botão de voltar que permite o usuário voltar para a tela anterior */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={Global.setas}>
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text>
        </TouchableOpacity>

        {/* Cabeçalho da tela, com o título da funcionalidade */}
        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>CADASTRAR USUÁRIO</Text>
        </View>
      </View>

      {/* Formulário para inserir os dados do novo usuário */}
      <View style={Global.containerForm}>
        {/* Campo de texto para o nome do usuário */}
        <Text style={Global.label}>Nome:</Text>
        <TextInput
          style={Global.input}
          placeholder="Digite o nome..."
          value={nome} // O valor do campo é vinculado ao estado 'nome'
          onChangeText={setNome} // Atualiza o estado 'nome' conforme o usuário digita
        />

        {/* Campo de texto para o e-mail do usuário */}
        <Text style={Global.label}>E-mail:</Text>
        <TextInput
          style={Global.input}
          placeholder="Digite o e-mail..."
          value={email} // O valor do campo é vinculado ao estado 'email'
          onChangeText={setEmail} // Atualiza o estado 'email' conforme o usuário digita
          keyboardType="email-address" // Tipo de teclado adaptado para inserção de e-mails
        />

        {/* Campo de texto para a senha do usuário */}
        <Text style={Global.label}>Senha:</Text>
        <TextInput
          style={Global.input}
          placeholder="Digite a senha..."
          value={senha} // O valor do campo é vinculado ao estado 'senha'
          onChangeText={setSenha} // Atualiza o estado 'senha' conforme o usuário digita
          secureTextEntry // Torna o campo de senha visível como caracteres mascarados
        />

        {/* Botão de cadastro que chama a função 'handleCadastro' ao ser pressionado */}
        <TouchableOpacity onPress={handleCadastro} style={Global.salvar}>
          <Text style={Global.botaoTexto}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
