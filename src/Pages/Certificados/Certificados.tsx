import React, { useState } from 'react'; // Importa a biblioteca principal do React e o hook useState
import { Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'; // Importa componentes do React Native
import Icon from 'react-native-vector-icons/MaterialIcons.js'; // Importa ícones da biblioteca react-native-vector-icons
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Importa a tipagem para navegação stack
import { useNavigation } from '@react-navigation/native'; // Importa o hook useNavigation para navegação
import { StackParamList } from '../../../App'; // Importa a lista de parâmetros de navegação
import CertificadosStyles from '../../styles/Certificados/CertificadosStyles.ts'; // Importa os estilos específicos para a página de Certificados
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP
import { useUser } from '../../context/UserContext'; // Importa o contexto do usuário
import { ipconfig } from '../../../ipConfig';

// Tipagem da página usando TypeScript
type NavigationProps = NativeStackNavigationProp<StackParamList, 'Certificados'>;

// Declaração do componente funcional Certificados
export const Certificados = () => {

  // Hook de navegação para permitir navegação programática entre telas
  const navigation = useNavigation<NavigationProps>();

  // Estado para a mensagem de retorno
  const [mensagem, setMensagem] = useState('');

  // Utiliza o contexto do usuário
  const { user } = useUser();

  // Função para verificar módulos e gerar certificado
  const handleGerarCertificado = async () => {
    try {
        const response = await axios.get(`http://${ipconfig}:3000/usuarioModulo/listarModulosPorUsuario`, {
            params: { idUsuario: user.id_usuario }
        });

        if (response.data.length === 0) {
            // Tenta cadastrar o certificado
            const certificadoResponse = await axios.post(`http://${ipconfig}:3000/certificado/cadastro`, {
                texto: 'Certificado de conclusão',
                horas: '4',
                idUsuario: user.id_usuario
            });

            setMensagem(certificadoResponse.data.mensagem);
        } else {
            setMensagem('Você ainda não completou todos os módulos necessários.');
        }
    } catch (error) {
      setMensagem('Erro ao gerar certificado.');
    }
  };

  // JSX para renderizar a interface do usuário
  return (
    <SafeAreaView style={CertificadosStyles.container}> {/* Container principal da página */}
      <Image 
        style={CertificadosStyles.motociclistaConsciente} 
        source={require('../../assets/moto_consciente_red.png')} 
        resizeMode="contain" 
      />
      
      <View style={CertificadosStyles.content}> {/* Conteúdo principal */}
        <Text style={CertificadosStyles.titulo}>Certificados</Text> {/* Título da página */}
        
        <TouchableOpacity style={CertificadosStyles.seguranca} onPress={handleGerarCertificado}>
          <Text style={CertificadosStyles.textoBotao}>Gerar Certificado</Text>
        </TouchableOpacity> {/* Botão para gerar o certificado */}

        <Text style={CertificadosStyles.mensagem}>{mensagem}</Text>{/* Mensagem de status */}
      </View>

      <View style={CertificadosStyles.rodape}> {/* Rodapé da página */}
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={CertificadosStyles.iconRodape}>
          <Icon name="home" size={30} color="#fff" /> {/* Ícone de navegação para a página Menu */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
