import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Modal } from 'react-native';

export default function App() {
  const [modalVisivel, setModalVisivel] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTexto}>Os dados estão corretos?</Text>

            <View style={styles.botaoContainer}>
              <TouchableOpacity 
                onPress={() => setModalVisivel(false)}
                style={[styles.botaoAcao, styles.botaoCorrigir]}
              >
                <Text style={styles.buttonText}>CORRIGIR</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => setModalVisivel(false)}
                style={[styles.botaoAcao, styles.botaoSim]}
              >
                <Text style={styles.buttonText}>SIM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{flex: 1, marginVertical: '15%', marginHorizontal: '10%'}}>

        <View style={{flex: 3}}>
          <Image style={styles.logoCMTU}
          source={require('../../assets/cmtu_logo.png')}
          resizeMode="contain"
          />
        </View>

        <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.titulo}>
            MOTOCICLISTA
            CONSCIENTE
          </Text>
        </View>

        <View style={{flex: 8}}>

        <Text style={{color: '#353535', fontWeight: 'bold'}}>Nome:</Text>
        <View style={styles.viewInput}>
            <TextInput
              style={{width: '85%', height: '60%', fontSize: 16}}
              placeholder="Digite seu nome completo..."
            />
          </View>

          <Text style={{color: '#353535', fontWeight: 'bold'}}>E-mail:</Text>
          <View style={styles.viewInput}>
            <TextInput
              style={{width: '85%', height: '60%', fontSize: 16}}
              placeholder="Digite seu melhor e-mail..."
            />
          </View>

          <Text style={{color: '#353535', fontWeight: 'bold'}}>Senha:</Text>
          <View style={styles.viewInput}>
            <TextInput
              style={{width: '85%', height: '60%', fontSize: 16}}
              placeholder="Digite sua melhor senha..."
              secureTextEntry
            />
          </View>

        </View>

        <View style={{flex: 8}}>
          <Image style={styles.logoCMTU}
            source={require('../../assets/create_account_2.png')}
            resizeMode="contain"
          />
        </View>

        <View style={{flex: 2}}>
          <TouchableOpacity style={[styles.viewInput, {backgroundColor: '#A6CE39'}]} onPress={() => setModalVisivel(true)}>
            <Text style={{color: '#353535', fontWeight: 'bold', fontSize: 16}}>
              CADASTRAR
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Modal
  openButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTexto: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botaoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  botaoAcao: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  botaoCorrigir: {
    backgroundColor: '#000', // Botão preto
  },
  botaoSim: {
    backgroundColor: '#FFD700', // Botão amarelo
  },

  //Cadastro
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