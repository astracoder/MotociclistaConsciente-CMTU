import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center', 
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
        fontSize: 36, 
        fontWeight: 'bold'
    },
    containerView: {
        flex: 9, 
        flexDirection: 'column', 
    },
    containerBoxInfo: {
        height: 50, 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: '#909090',
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
        flex: 6, 
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
        fontWeight: 'bold'
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
      input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#FFF',
        fontSize: 16,
      },
      salvar: {
        backgroundColor: '#ED1C24',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20
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
})

export default styles;