import { StyleSheet } from 'react-native';

const PerguntaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#303030',
  },
  alternativasContainer: {
    marginTop: 10,
  },
  alternativa: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textoAlternativa: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
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
  alternativaSelecionada: {
    borderColor: '#EC232A',
    borderWidth: 3,
  },
  
  botaoProximoDesabilitado: {
    backgroundColor: '#ccc',
  },
});

export default PerguntaStyles;
