import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  motociclistaConsciente: {
    width: '70%',
    height: 100,
    alignSelf: 'center',
    marginTop: 35,
    marginBottom: -80
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: '10%', 
    marginVertical: '10%',
  },
  label: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dedcdc'
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  textoSwitch: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
  },
  botaoDesconectar: {
    width: '100%',
    height: 40,
    backgroundColor: '#303030',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#171717',
    shadowOffset: {width: 3, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textoBotaoDesconectar: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
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
