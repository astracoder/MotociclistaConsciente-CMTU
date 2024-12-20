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
      alignItems: 'center',
      justifyContent: 'space-between', 
      marginTop: '10%'
    },
    motociclistaConsciente: {
      width: '100%',
      height: 100,
      alignSelf: 'center',
      marginBottom: 30
    },
    logo: {
      width: '56%',
      height: 40,
      alignSelf: 'center',
      marginBottom: 50,
    },
    titulo: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#404040',
      textAlign: 'center',
      width: '80%'
    },
    grid: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -50,
    },
    iconLinha: {
      backgroundColor: 'Yellow',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      gap: 40
    },
    iconContainer: {
      alignItems: 'center',
    },
    iconStyle1: {
      backgroundColor: '#0088C7',
      borderRadius: 100,
      padding: 20
    },
    iconStyle2: {
      backgroundColor: '#ED1C24',
      borderRadius: 100,
      padding: 20
    },
    iconStyle3: {
      backgroundColor: '#A6CE39',
      borderRadius: 100,
      padding: 20
    },
    iconStyle4: {
      backgroundColor: '#505050',
      borderRadius: 100,
      padding: 20
    },
    textoOpcao: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#404040',
      textAlign: 'center',
      marginTop: 10 
    },
    textoOpcaoMargin: {
      marginBottom: 30
    },
    rodape: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#ED1C24',
      paddingVertical: 10,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    iconRodape: {
      alignItems: 'center',
    },
  });

  export default styles;