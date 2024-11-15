import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center', 
    },
    content: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center', 
      marginHorizontal: '10%',
      marginVertical: '10%'
    },
    logo: {
      width: '70%',
      height: 100,
      alignSelf: 'center'
    },
    titulo: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#404040',
      textAlign: 'center',
      marginBottom: 30
    },
    textoInput: {
      color: '#404040',
      textAlign: 'left', 
      fontSize: 16,
      marginBottom: 5,
      fontWeight: 'bold'
    },
    input: {
      color: '#606060',
      width: '100%',
      height: 50,
      backgroundColor: '#f0f0f0',
      borderRadius: 32,
      paddingHorizontal: 15,
      fontSize: 14,
      marginBottom: 15,
      shadowColor: '#171717',
      shadowOffset: {width: 3, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    botaoSalvar: {
      width: '100%',
      backgroundColor: '#A6CE39',
      paddingVertical: 15,
      borderRadius: 32,
      alignItems: 'center',
      marginBottom: 10,
      shadowColor: '#171717',
      shadowOffset: {width: 3, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    textoBotaoSalvar: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#353535',
    },
    voltar: {
      fontSize: 14,
      color: '#0066cc',
      textDecorationLine: 'underline',
      alignSelf: 'center'
    },
  });

  export default styles;