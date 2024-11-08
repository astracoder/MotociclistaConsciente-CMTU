import { StyleSheet, Text, View } from 'react-native';

import Login from './src/pages/Login/Login.tsx';
import Cadastro from './src/pages/Cadastro/Cadastro.tsx';
import Perfil from './src/pages/Perfil/Perfil.tsx';

export default function App() {
  return (
    <View>
      {/* <Login /> */}
      {/* <Cadastro/> */}
      <Perfil/>
    </View>
  );
}