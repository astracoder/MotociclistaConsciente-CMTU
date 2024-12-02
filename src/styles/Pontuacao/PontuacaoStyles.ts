import { StyleSheet } from 'react-native';

const PontuacaoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  tituloParabens: {
    color: '#303030',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  tituloNota: {
    color: '#303030',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
  },
  pontuacao: {
    color: '#EC232A',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  botaoProximo: {
    marginTop: 20,
    backgroundColor: '#EC232A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PontuacaoStyles;
