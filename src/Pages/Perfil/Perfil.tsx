import React from 'react';
import { Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons.js';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../../App';
import { useUser } from '../../context/UserContext.js';
import PerfilStyles from '../../styles/Perfil/PerfilStyles.ts';


//Tipagem da pagina TYPESCRIPT
type NavigationProps = NativeStackNavigationProp<StackParamList, 'Perfil'>

//Variaveis e funções do Menu
export const Perfil = () => {
  const navigation = useNavigation<NavigationProps>();

  // user são os dados que foram setados pelo useUser na tela de Login, e pode ser usado aqui e em qualquer pagina.
  const { user } = useUser();

  return (
      <SafeAreaView style={PerfilStyles.container}>
      <Image 
          style={PerfilStyles.motociclistaConsciente} 
          source={require('../../assets/moto_consciente_red.png')} 
          resizeMode="contain" 
        />

        <View style={PerfilStyles.content}>
          <Text style={PerfilStyles.titulo}>Edite seu perfil</Text> 
          <Text style={PerfilStyles.textoInput}>Nome:</Text>
          <TextInput 
            style={PerfilStyles.input} 
            value={user.nome}
            aria-disabled
          />
  
          <Text style={PerfilStyles.textoInput}>E-mail:</Text>
          <TextInput 
            style={PerfilStyles.input} 
            value={user.email}
            aria-disabled
          />

          <TouchableOpacity onPress={() => navigation.navigate('Reset')} style={PerfilStyles.botaoMudarSenha}>
            <Text style={PerfilStyles.textoBotaoMudarSenha}>Alterar senha</Text>
          </TouchableOpacity>
        </View> 

        <View style={PerfilStyles.rodape}>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={PerfilStyles.iconRodape}>
            <Icon name="home" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
}


