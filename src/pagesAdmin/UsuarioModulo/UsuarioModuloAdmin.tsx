import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Global from '../../stylesAdmin/Global/globalStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/native';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'ModuloAdmin'>

export const UsuarioModuloAdmin = () => {
  const navigation = useNavigation<NavigationProps>();
  const nomeTeste = "LEGISLAÇÃO";

  return (
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>

        <TouchableOpacity onPress={() => navigation.navigate('ModuloAdmin')} style={Global.setas}>
          <Text style={{color: '#ED1C24', fontSize: 48}}>
            {'⬅'}
          </Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>
            USUÁRIO MODULOS
          </Text>          
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('AtividadeAdmin')} style={Global.setas}>
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