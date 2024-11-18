import React from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons.js';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type StackParamList = {
  Login: undefined;
  Cadastro: undefined
}

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Certificados'>

import CertificadosStyles from '../../styles/Certificados/CertificadosStyles.ts';

export const Certificados = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
      <SafeAreaView style={CertificadosStyles.container}>
        <Image 
          style={CertificadosStyles.motociclistaConsciente} 
          source={require('../../assets/moto_consciente_red.png')} 
          resizeMode="contain" 
        />
        <View style={CertificadosStyles.content}>
        <Text style={CertificadosStyles.titulo}>Certificados</Text>

          <TouchableOpacity style={CertificadosStyles.seguranca}>
            <Text style={CertificadosStyles.textoBotao}>Visualizar certificado</Text>
          </TouchableOpacity>

          <TouchableOpacity style={CertificadosStyles.placas}>
            <Text style={CertificadosStyles.textoBotao}>Baixar ceritifcado</Text>
          </TouchableOpacity>

        </View> 

        <View style={CertificadosStyles.rodape}>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={CertificadosStyles.iconRodape}>
            <Icon name="home" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
}


