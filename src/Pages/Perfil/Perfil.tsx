import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, marginVertical: '15%', marginHorizontal: '10%'}}>

        <View style={{flex: 3}}>
          <Image style={styles.logoCMTU}
          source={require('../../assets/cmtu_logo.png')}
          resizeMode="contain"
          />
        </View>

        <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.titulo}>
          </Text>
            PERFIL
        </View>

        <View style={{flex: 6}}>

          <Text style={{color: '#353535', fontWeight: 'bold'}}>E-mail:</Text>
          <View style={styles.viewInput}>
            <TextInput
              style={{width: '85%', height: '60%', fontSize: 16}}
              placeholder="Digite seu e-mail..."
            />
          </View>

          <Text style={{color: '#353535', fontWeight: 'bold'}}>Senha:</Text>
          <View style={styles.viewInput}>
            <TextInput
              style={{width: '85%', height: '60%', fontSize: 16}}
              placeholder="Digite sua senha..."
              secureTextEntry
            />
          </View>

        </View>

        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity>
            <Text style={{flex: 1, textAlign: 'right', fontSize: 16, textDecorationLine: 'underline',}}>
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 6}}>
          <Image style={styles.logoCMTU}
            source={require('../../assets/login_account_2.png')}
            resizeMode="contain"
          />
        </View>

        <View style={{flex: 2}}>
          <TouchableOpacity style={[styles.viewInput, {backgroundColor: '#A6CE39'}]}>
            <Text style={{color: '#353535', fontWeight: 'bold', fontSize: 16}}>
              LOGAR
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 2, justifyContent: 'flex-end', alignItems: 'center'}}>
          <TouchableOpacity>
            <Text style={{textAlign: 'center', fontSize: 16}}>Você não tem uma conta?</Text>
            <Text style={{textAlign: 'center', fontSize: 16, color: '#353535', textDecorationLine: 'underline',}}>Crie uma conta</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCMTU: {
    height: '100%',
    width: '100%',
  },
  titulo: {
    color: '#353535',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  viewInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc800',
    width: '100%',
    height: '100%',
    borderRadius: 50,
    marginVertical: '4%',
  }

});