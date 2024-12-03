import React, { useState, useEffect } from 'react'; 
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'; 
import axios from 'axios'; 
import Global from '../../stylesAdmin/Global/globalStyles'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 
import { StackParamList } from '../../../App'; 
import { useNavigation } from '@react-navigation/native'; 

import { ipconfig } from '../../../ipConfig.js';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'ModuloAdmin'>; 

export const UsuarioModuloAdmin = () => {
  const navigation = useNavigation<NavigationProps>(); 
  const [dados, setDados] = useState<any[]>([]);

  const handleListarUsuarioModulo = async () => {
    try {
      const response = await axios.get(`http://${ipconfig}:3000/usuarioModulo/selecionarUsuariosModulos`);
      const json = response.data;

      if (Array.isArray(json)) {
        setDados(json);
      } else {
        console.warn('A resposta da API não é um array:', json);
        setDados([]);
      }
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  }

  useEffect(() => {
    handleListarUsuarioModulo();
  }, []);

  return (
    <SafeAreaView style={Global.container}>
      <View style={Global.content}>
        <TouchableOpacity onPress={() => navigation.navigate('ModuloAdmin')} style={Global.setas}>
          <Text style={{color: '#ED1C24', fontSize: 48}}>{'⬅'}</Text>
        </TouchableOpacity>

        <View style={Global.containerAba}>
          <Text style={Global.nomeAba}>USUÁRIOS MODULOS</Text>          
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('AtividadeAdmin')} style={Global.setas}>
          <Text style={{color: '#ED1C24', fontSize: 48}}>{'⮕'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={Global.containerView}>
        {dados.map((item, index) => {
          // Corrigindo o valor da fk_modulo_id_modulo
          const moduloNome = (() => {
            switch(item.fk_modulo_id_modulo) {
              case 1: return 'PEDESTRE';
              case 2: return 'ACIDENTES';
              case 3: return 'PLACAS';
              case 4: return 'LEGISLAÇÃO';
              case 5: return 'MECÂNICA';
              default: return 'Desconhecido';
            }
          })();

          return (
            <TouchableOpacity 
              onPress={() => navigation.navigate('UsuarioModuloEditDeleteAdmin', {
                id: item.id_usuario_modulo,
                status: item.status,
                aprovado: item.aprovado,
                iniciado: item.iniciado,
                nota_final: item.nota_final
              })}
              key={index} 
              style={[Global.containerBoxInfo, item.status === 0 && Global.boxInativo]}
            >
              <View style={Global.containerID}>
                <Text style={Global.containerIDTexto}>{item.id_usuario_modulo}</Text>
              </View>
              <View style={Global.containerNome}>
                <Text style={Global.containerNomeTexto}>{item.nome_usuario}</Text>
              </View>
              <View style={Global.containerIDModulo}>
                {/* Aqui o nome do módulo é passado de forma segura */}
                <Text style={Global.containerIDModuloTexto}>{moduloNome}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity onPress={() => navigation.navigate('UsuarioModuloAddAdmin')} style={Global.adicionar}>
        <Text style={{fontSize: 34, textAlign: 'center', color: 'white'}}>{'+'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
