import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center', 
    },
    content: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'space-between', 
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
    },
    subTitulo: {
      fontSize: 20,
      color: '#353535',
      textAlign: 'center',
      marginBottom: 20
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
    esqueceuSenha: {
      fontSize: 14,
      color: '#0066cc',
      textDecorationLine: 'underline',
      marginBottom: 20,
      alignSelf: 'center'
    },
    botaoLogin: {
      width: '100%',
      backgroundColor: '#A6CE39',
      paddingVertical: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 30,
    },
    textoBotaoLogin: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#353535',
    },
    imagemLogin: {
      width: '60%',
      height: 120,
      alignSelf: 'center'
    },
    secaoCriarConta: {
      alignItems: 'center',
    },
    linkCriarConta: {
      fontSize: 16,
      color: '#0066cc',
      textDecorationLine: 'underline',
    },
  });

  export default styles;