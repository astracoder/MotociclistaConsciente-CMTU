import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Global from '../../stylesAdmin/Global/globalStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/native';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'AlternativaAdmin'>

export const CertificadoAdmin = () => {
  const navigation = useNavigation<NavigationProps>();
  const nomeTeste = "Você passou, parabéns!";

  return (
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>

        <TouchableOpacity style={Global.setas}>
          <Text style={{color: '#ED1C24', fontSize: 48}}>
            {'⬅'}
          </Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>
            CERTIFICADO
          </Text>          
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('DataScienceAdmin')} style={Global.setas}>
          <Text style={{color: '#ED1C24', fontSize: 48}}>
            {'⮕'}
          </Text>
        </TouchableOpacity>

      </View>
      
      <ScrollView style={Global.containerView}>

        <TouchableOpacity style={Global.containerBoxInfo}>
          <View style={Global.containerID}>
            <Text style={Global.containerIDTexto}>
              1
            </Text>
          </View>
          <View style={Global.containerNome}>
            <Text style={Global.containerNomeTexto}>
              {nomeTeste.slice(0, 50)}...
            </Text>
          </View>
        </TouchableOpacity>

      </ScrollView>

      <TouchableOpacity style={Global.adicionar}>
        <Text style={{fontSize: 34, textAlign: 'center', color: 'white'}}>
          +
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};