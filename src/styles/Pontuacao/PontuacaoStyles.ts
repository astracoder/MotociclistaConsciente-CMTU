import { StyleSheet } from 'react-native';

const PontuacaoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 40
  },
  tituloParabens: {
    color: '#303030',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  titulo: {
    color: '#606060',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  pontuacao: {
    color: '#EC232A',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default PontuacaoStyles;
