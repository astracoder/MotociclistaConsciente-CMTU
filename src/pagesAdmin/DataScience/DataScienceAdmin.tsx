import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, Image, ScrollView, View, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Global from '../../stylesAdmin/Global/globalStyles';

export const DataScienceAdmin = () => {
  const navigation = useNavigation();
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
    };

    Dimensions.addEventListener('change', updateOrientation);
    updateOrientation();

    return () => {
      Dimensions.removeEventListener('change', updateOrientation);
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Top Navigation with Arrows */}
      <View style={Global.content}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CertificadoAdmin')}
          style={Global.setas}
        >
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⬅'}</Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>DATA SCIENCE</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('UsuarioAdmin')}
          style={Global.setas}
        >
          <Text style={{ color: '#ED1C24', fontSize: 48 }}>{'⮕'}</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
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
              fontSize: isLandscape ? 24 : 22,
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
            source={require('../../assets/DataScience/grafico_acertos.png')}
            resizeMode="contain"
            style={{
              width: isLandscape ? '100%' : '90%',
              height: isLandscape ? 300 : 200,
              alignSelf: 'center',
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
            source={require('../../assets/DataScience/grafico_conseguiu_certificado.png')}
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
            source={require('../../assets/DataScience/grafico_erros.png')}
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
            source={require('../../assets/DataScience/grafico_media_notas.png')}
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
            source={require('../../assets/DataScience/grafico_modulos_iniciados.png')}
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
