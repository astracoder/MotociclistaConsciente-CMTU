import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import ModuloStyles from '../../stylesAdmin/ModuloAdmin/ModuloStyles';

export const ModuloAdmin = () => {
  const nomeTeste = "Legislação";

  return (
    <SafeAreaView style={ModuloStyles.container}>
      <View style={ModuloStyles.content}>

        <TouchableOpacity style={ModuloStyles.setas}>
          <Text style={{color: '#ED1C24', fontSize: 48}}>
            {'⬅'}
          </Text>
        </TouchableOpacity>

        <View style={ModuloStyles.containerAba}>
          <Text style={ModuloStyles.nomeAba}>
            MODULO
          </Text>          
        </View>

        <TouchableOpacity style={ModuloStyles.setas}>
          <Text style={{color: '#ED1C24', fontSize: 48}}>
            {'⮕'}
          </Text>
        </TouchableOpacity>

      </View>
      
      <ScrollView style={ModuloStyles.containerView}>

        <TouchableOpacity style={ModuloStyles.containerBoxInfo}>
          <View style={ModuloStyles.containerID}>
            <Text style={ModuloStyles.containerIDTexto}>
              1
            </Text>
          </View>
          <View style={ModuloStyles.containerNome}>
            <Text style={ModuloStyles.containerNomeTexto}>
              {nomeTeste.slice(0, 50)}...
            </Text>
          </View>
        </TouchableOpacity>

      </ScrollView>

      <TouchableOpacity style={ModuloStyles.adicionar}>
        <Text style={{fontSize: 34, textAlign: 'center', color: 'white'}}>
          +
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};