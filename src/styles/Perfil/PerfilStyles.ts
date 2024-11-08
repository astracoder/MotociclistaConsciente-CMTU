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
      borderRadius: 8,
      paddingHorizontal: 15,
      fontSize: 14,
      marginBottom: 15,
    },
    imagemCadastro: {
      width: '60%',
      height: 120,
      alignSelf: 'center'
    },
    botaoMudarSenha: {
      width: '100%',
      height: 50,
      backgroundColor: '#808080',
      paddingVertical: 15,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20
    },
    textoBotaoMudarSenha: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    botaoSalvarDados: {
      width: '100%',
      height: 50,
      backgroundColor: '#A6CE39',
      paddingVertical: 15,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textoBotaoSalvarDados: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#353535',
    },
  });

  export default styles;