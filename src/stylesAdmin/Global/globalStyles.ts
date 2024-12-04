import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center', 
        marginTop: 30
    },
    content: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        shadowRadius: 10,
        marginBottom: 10
    },
    setas: {
        flex: 2, 
        justifyContent: 'center',
        alignItems: 'center'
         
    },
    containerAba: {
        flex: 6, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    nomeAba: {
        color: '#303030',
        fontSize: 28, 
        fontWeight: 'bold'
    },
    containerView: {
        flex: 9, 
        flexDirection: 'column', 
    },
    containerBoxInfo: {
        height: 40, 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: '#909090',
        paddingVertical: '1%',
        marginBottom: 5,
    },
    containerID: {
        flex: 1, 
        height: '100%', 
        justifyContent: 'center', 
        borderRightWidth: 1,
        borderColor: '#909090',
    },
    containerNome: {
        flex: 5, 
        height: '100%', 
        justifyContent: 'center'
    },
    containerIDTexto: {
        color: '#ED1C24',
        textAlign: 'center', 
        fontWeight: 'bold'
    },
    containerNomeTexto: {
        color: '#303030',
        paddingHorizontal: '5%',
        fontWeight: 'bold',
    },
    containerIDModulo: {
      flex: 2, 
      height: '100%', 
      justifyContent: 'center', 
      borderRightWidth: 1,
      borderColor: '#909090',
    },
      containerIDModuloTexto: {
      fontSize: 12, 
      color: '#0088C7',
      textAlign: 'center', 
      fontWeight: 'bold',
    },
      adicionar: {
        flex: 1, 
        height: 50, 
        width: 50,
        backgroundColor: '#ED1C24', 
        position: 'absolute', 
        bottom: 20, right: 20, 
        borderRadius: 10
    },
    containerForm: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
      },
      label: {
        color: '#303030',
        fontSize: 16,
        marginBottom: 10
      },
      input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#FFF',
        fontSize: 14,
        color: '#606060'
      },
      salvar: {
        backgroundColor: '#ED1C24',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 40
      },
      ativar: {
        backgroundColor: '#85C225',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10
      },
      deletar: {
        backgroundColor: '#303030',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
      },
      botaoTexto: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
      },
      button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
      },
      itemContainer: {
        padding: 10,
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      itemText: {
        fontSize: 14,
      },
      boxInativo: {
        fontSize: 16, 
        color: '#fefefe',
        backgroundColor: '#ffd4d4',
        textDecorationLine: 'line-through',
      }
})

export default styles;