import React from 'react';
import {Text, SafeAreaView, Image, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons.js';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons.js';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../../App';
import { useUser } from '../../context/UserContext.js';
import MenuStyles from '../../styles/Menu/MenuStyles.ts';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Menu'>

export const Menu = () => {
  const navigation = useNavigation<NavigationProps>();
  const { user } = useUser();

  return (
    <SafeAreaView style={MenuStyles.container}>
      <SafeAreaView style={MenuStyles.content}>
        <Image 
          style={MenuStyles.motociclistaConsciente} 
          source={require('../../assets/moto_consciente_red.png')} 
          resizeMode="contain" 
        />

        <Text style={MenuStyles.titulo}>Bem vindo, {user.nome}!</Text>

        <View style={MenuStyles.grid}>
            <View style={MenuStyles.iconLinha}>
                <TouchableOpacity onPress={() => navigation.navigate('Modulos')} style={MenuStyles.iconContainer}>
                  <Icon name="menu-book" size={80} color="#FFF" style={MenuStyles.iconStyle1}/>
                  <Text style={[MenuStyles.textoOpcao, MenuStyles.textoOpcaoMargin]}>Módulos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Certificados')} style={MenuStyles.iconContainer}>
                  <Icon2 name="certificate-outline" size={80} color="#FFF" style={MenuStyles.iconStyle2}/>
                  <Text style={[MenuStyles.textoOpcao, MenuStyles.textoOpcaoMargin]}>Certificados</Text>
                </TouchableOpacity>
            </View>

            <View style={MenuStyles.iconLinha}>
                <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={MenuStyles.iconContainer}>
                  <Icon name="person" size={80} color="#fff" style={MenuStyles.iconStyle3}/>
                  <Text style={MenuStyles.textoOpcao}>Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => navigation.navigate('Configuracoes')} style={MenuStyles.iconContainer}>
                  <Icon name="settings" size={80} color="#FFF" style={MenuStyles.iconStyle4}/>
                  <Text style={MenuStyles.textoOpcao}>Configuração</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        <Image 
          style={MenuStyles.logo} 
          source={require('../../assets/cmtu_logo.png')} 
          resizeMode="contain" 
        />
      </SafeAreaView>
    </SafeAreaView>
  );
}