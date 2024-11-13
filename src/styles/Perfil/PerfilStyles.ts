import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: '10%', 
    marginVertical: '10%',
  },
  motociclistaConsciente: {
    width: '70%',
    height: 100,
    alignSelf: 'center',
    marginTop: 35,
    marginBottom: -80
  },
  textoInput: {
    color: '#404040',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    color: '#606060',
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 32,
    paddingHorizontal: 15,
    fontSize: 14,
    marginBottom: 30
  },
  botaoMudarSenha: {
    width: '100%',
    height: 50,
    backgroundColor: '#505050',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
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
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotaoSalvarDados: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#353535',
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
