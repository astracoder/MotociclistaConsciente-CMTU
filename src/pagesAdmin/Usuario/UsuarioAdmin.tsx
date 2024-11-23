import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import UsuarioStyles from '../../stylesAdmin/UsuarioAdmin/UsuarioStyles';

export const UsuarioAdmin = () => {
  const nomeTeste = "Constantino Maximiliano";

  return (
    <SafeAreaView style={UsuarioStyles.container}>
      <View style={UsuarioStyles.content}>

        <TouchableOpacity style={UsuarioStyles.setas}>
          <Text style={{color: '#ED1C24', fontSize: 48}}>
            {'⬅'}
          </Text>
        </TouchableOpacity>

        <View style={UsuarioStyles.containerAba}>
          <Text style={UsuarioStyles.nomeAba}>
            USUARIO
          </Text>          
        </View>

        <TouchableOpacity style={UsuarioStyles.setas}>
          <Text style={{color: '#ED1C24', fontSize: 48}}>
            {'⮕'}
          </Text>
        </TouchableOpacity>

      </View>
      
      <ScrollView style={UsuarioStyles.containerView}>

        <TouchableOpacity style={UsuarioStyles.containerBoxInfo}>
          <View style={UsuarioStyles.containerID}>
            <Text style={UsuarioStyles.containerIDTexto}>
              1
            </Text>
          </View>
          <View style={UsuarioStyles.containerNome}>
            <Text style={UsuarioStyles.containerNomeTexto}>
              {nomeTeste.slice(0, 50)}...
            </Text>
          </View>
        </TouchableOpacity>

      </ScrollView>

      <TouchableOpacity style={UsuarioStyles.adicionar}>
        <Text style={{fontSize: 34, textAlign: 'center', color: 'white'}}>
          +
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};