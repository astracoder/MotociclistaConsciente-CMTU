import React from 'react';
import {Text, SafeAreaView, Image, TextInput, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons.js';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type StackParamList = {
  Login: undefined;
  Cadastro: undefined
}

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Login'>

import MenuStyles from '../../styles/Menu/MenuStyles.ts';

export default function Login() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView style={MenuStyles.container}>
      <SafeAreaView style={MenuStyles.content}>
        <Image 
          style={MenuStyles.logo} 
          source={require('../../assets/cmtu_logo.png')} 
          resizeMode="contain" 
        />

        <Image 
          style={MenuStyles.motociclistaConsciente} 
          source={require('../../assets/moto_consciente_red.png')} 
          resizeMode="contain" 
        />

        <View style={MenuStyles.grid}>
            <View style={MenuStyles.iconLinha}>
                <TouchableOpacity style={MenuStyles.iconContainer}>
                  <Icon name="menu-book" size={80} color="#FFF" style={MenuStyles.iconStyle1}/>
                  <Text style={[MenuStyles.textoOpcao, MenuStyles.textoOpcaoMargin]}>Módulos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={MenuStyles.iconContainer}>
                  <Icon name="emoji-events" size={80} color="#FFF" style={MenuStyles.iconStyle2}/>
                  <Text style={[MenuStyles.textoOpcao, MenuStyles.textoOpcaoMargin]}>Certificados</Text>
                </TouchableOpacity>
            </View>

            <View style={MenuStyles.iconLinha}>
                <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={MenuStyles.iconContainer}>
                  <Icon name="person" size={80} color="#fff" style={MenuStyles.iconStyle3}/>
                  <Text style={MenuStyles.textoOpcao}>Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={MenuStyles.iconContainer}>
                  <Icon name="settings" size={80} color="#FFF" style={MenuStyles.iconStyle4}/>
                  <Text style={MenuStyles.textoOpcao}>Configuração</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={MenuStyles.rodape}>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={MenuStyles.iconRodape}>
            <Icon name="home" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </SafeAreaView>
  );
}