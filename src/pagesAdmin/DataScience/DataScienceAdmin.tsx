import React, { useState, useEffect } from 'react';  // Importa React e hooks useState, useEffect
import { Text, SafeAreaView, Image, ScrollView, View, Dimensions, TouchableOpacity } from 'react-native';  // Importa componentes essenciais do React Native
import { useNavigation } from '@react-navigation/native';  // Importa o hook useNavigation para navegação entre telas
import Global from '../../stylesAdmin/Global/globalStyles';  // Importa os estilos globais definidos no projeto

export const DataScienceAdmin = () => {
  // Hook para controlar a navegação entre telas
  const navigation = useNavigation();

  // Estado para detectar se a orientação da tela é paisagem
  const [isLandscape, setIsLandscape] = useState(false);

  // Hook useEffect para detectar a mudança de orientação da tela
  useEffect(() => {
    // Função para verificar a orientação da tela
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');  // Obtém a largura e altura da tela
      setIsLandscape(width > height);  // Atualiza o estado 'isLandscape' com base na comparação largura/altura
    };

    // Adiciona o listener para detectar mudanças na orientação
    Dimensions.addEventListener('change', updateOrientation);
    
    // Chama a função uma vez ao montar o componente para verificar a orientação inicial
    updateOrientation();

    // Função de limpeza: remove o listener quando o componente for desmontado
    return () => {
      Dimensions.removeEventListener('change', updateOrientation);
    };
  }, []);  // O efeito é executado uma vez quando o componente é montado

  return (
    // SafeAreaView é utilizado para garantir que o conteúdo não sobreponha a área de interação da tela (ex: barra de status)
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Barra de navegação superior */}
      <View style={Global.content}>
        {/* Botão de navegação para voltar para a tela de administração de certificados */}
        <TouchableOpacity
          onPress={() => navigation.navigate('CertificadoAdmin')}
          style={Global.setas}
        >
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text>
        </TouchableOpacity>

        {/* Título da seção de Data Science */}
        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>DATA SCIENCE</Text>
        </View>

        {/* Botão de navegação para avançar para a tela de administração de usuários */}
        <TouchableOpacity
          onPress={() => navigation.navigate('UsuarioAdmin')}
          style={Global.setas}
        >
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⮕'}</Text>
        </TouchableOpacity>
      </View>

      {/* Container com rolagem para conteúdo */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Título do relatório */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
            textAlign: 'center',
            color: 'black',
            letterSpacing: 1.5,
          }}
        >
          Relatório
        </Text>

        {/* Gráfico de Acertos */}
        <View style={{ marginVertical: 16, borderWidth: 2, borderColor: 'black', padding: 8 }}>
          <Text
            style={{
              fontSize: isLandscape ? 24 : 22,  // Tamanho de fonte ajustado com base na orientação
              fontWeight: 'bold',
              marginBottom: 8,
              color: 'black',
              textTransform: 'uppercase',
              letterSpacing: 1.5,
            }}
          >
            Gráfico de Acertos
          </Text>
          <Image
            source={require('../../assets/DataScience/grafico_acertos.png')}  // Imagem do gráfico de acertos
            resizeMode="contain"  // Garante que a imagem seja redimensionada sem distorções
            style={{
              width: isLandscape ? '100%' : '90%',  // Ajusta a largura da imagem com base na orientação
              height: isLandscape ? 300 : 200,  // Ajusta a altura da imagem com base na orientação
              alignSelf: 'center',  // Centraliza a imagem
            }}
          />
        </View>

        {/* Gráfico de Certificados Obtidos */}
        <View style={{ marginVertical: 16, borderWidth: 2, borderColor: 'black', padding: 8 }}>
          <Text
            style={{
              fontSize: isLandscape ? 24 : 22,
              fontWeight: 'bold',
              marginBottom: 8,
              color: 'black',
              textTransform: 'uppercase',
              letterSpacing: 1.5,
            }}
          >
            Gráfico de Certificados Obtidos
          </Text>
          <Image
            source={require('../../assets/DataScience/grafico_conseguiu_certificado.png')}  // Imagem do gráfico de certificados
            resizeMode="contain"
            style={{
              width: isLandscape ? '100%' : '90%',
              height: isLandscape ? 300 : 200,
              alignSelf: 'center',
            }}
          />
        </View>

        {/* Gráfico de Erros */}
        <View style={{ marginVertical: 16, borderWidth: 2, borderColor: 'black', padding: 8 }}>
          <Text
            style={{
              fontSize: isLandscape ? 24 : 22,
              fontWeight: 'bold',
              marginBottom: 8,
              color: 'black',
              textTransform: 'uppercase',
              letterSpacing: 1.5,
            }}
          >
            Gráfico de Erros
          </Text>
          <Image
            source={require('../../assets/DataScience/grafico_erros.png')}  // Imagem do gráfico de erros
            resizeMode="contain"
            style={{
              width: isLandscape ? '100%' : '90%',
              height: isLandscape ? 300 : 200,
              alignSelf: 'center',
            }}
          />
        </View>

        {/* Gráfico de Média de Notas */}
        <View style={{ marginVertical: 16, borderWidth: 2, borderColor: 'black', padding: 8 }}>
          <Text
            style={{
              fontSize: isLandscape ? 24 : 22,
              fontWeight: 'bold',
              marginBottom: 8,
              color: 'black',
              textTransform: 'uppercase',
              letterSpacing: 1.5,
            }}
          >
            Gráfico de Média de Notas
          </Text>
          <Image
            source={require('../../assets/DataScience/grafico_media_notas.png')}  // Imagem do gráfico de média de notas
            resizeMode="contain"
            style={{
              width: isLandscape ? '100%' : '90%',
              height: isLandscape ? 300 : 200,
              alignSelf: 'center',
            }}
          />
        </View>

        {/* Gráfico de Módulos Iniciados */}
        <View style={{ marginVertical: 16, borderWidth: 2, borderColor: 'black', padding: 8 }}>
          <Text
            style={{
              fontSize: isLandscape ? 24 : 22,
              fontWeight: 'bold',
              marginBottom: 8,
              color: 'black',
              textTransform: 'uppercase',
              letterSpacing: 1.5,
            }}
          >
            Gráfico de Módulos Iniciados
          </Text>
          <Image
            source={require('../../assets/DataScience/grafico_modulos_iniciados.png')}  // Imagem do gráfico de módulos iniciados
            resizeMode="contain"
            style={{
              width: isLandscape ? '100%' : '90%',
              height: isLandscape ? 300 : 200,
              alignSelf: 'center',
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
