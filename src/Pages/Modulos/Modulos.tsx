import React from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons.js';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type StackParamList = {
  Login: undefined;
  Cadastro: undefined
}

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Modulos'>

import ModulosStyles from '../../styles/Modulos/ModulosStyles.ts';

export default function App() {
  const navigation = useNavigation<NavigationProps>();

  return (
      <SafeAreaView style={ModulosStyles.container}>
        <Image 
          style={ModulosStyles.motociclistaConsciente} 
          source={require('../../assets/moto_consciente_red.png')} 
          resizeMode="contain" 
        />
        <View style={ModulosStyles.content}>
        <Text style={ModulosStyles.titulo}>Módulos</Text>

          <TouchableOpacity style={ModulosStyles.seguranca}>
            <Text style={ModulosStyles.textoBotao}>SEGURANÇA</Text>
          </TouchableOpacity>

          <TouchableOpacity style={ModulosStyles.placas}>
            <Text style={ModulosStyles.textoBotao}>PLACAS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={ModulosStyles.pedestres}>
            <Text style={ModulosStyles.textoBotao}>PEDESTRES</Text>
          </TouchableOpacity>

          <TouchableOpacity style={ModulosStyles.acidentes}>
            <Text style={ModulosStyles.textoBotao}>ACIDENTES</Text>
          </TouchableOpacity>
        </View> 

        <View style={ModulosStyles.rodape}>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={ModulosStyles.iconRodape}>
            <Icon name="home" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
}


