import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/pages/Login/Login.tsx';
import Reset from './src/pages/Reset/Reset.tsx';
import Cadastro from './src/pages/Cadastro/Cadastro.tsx';
import Menu from './src/pages/Menu/Menu.tsx';
import Modulos from './src/pages/Modulos/Modulos.tsx';
import Certificados from './src/pages/Certificados/Certificados.tsx';
import Perfil from './src/pages/Perfil/Perfil.tsx';
import Configuracoes from './src/pages/Configuracoes/Configuracoes.tsx';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Cadastro'>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Cadastro' component={Cadastro} options={{headerShown: false}}/>
        <Stack.Screen name='Menu' component={Menu} options={{headerShown: false}}/>
        <Stack.Screen name='Modulos' component={Modulos} options={{headerShown: false}}/>
        <Stack.Screen name='Certificados' component={Certificados} options={{headerShown: false}}/>
        <Stack.Screen name='Perfil' component={Perfil} options={{headerShown: false}}/>
        <Stack.Screen name='Reset' component={Reset} options={{headerShown: false}}/>
        <Stack.Screen name='Configuracoes' component={Configuracoes} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
} 