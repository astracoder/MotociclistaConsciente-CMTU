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
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#404040',
    textAlign: 'center',
    marginBottom: 50
  },
  seguranca: {
    width: '100%',
    height: 50,
    backgroundColor: '#A6CE39',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#171717',
    shadowOffset: {width: 3, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  placas: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFCB08',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#171717',
    shadowOffset: {width: 3, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fefefe',
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
  mensagem: {
    color: '#303030',
    textAlign: 'center'
  }
});

export default styles;
