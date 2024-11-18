import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './src/Context/UserContext';

import { Login } from './src/pages/Login/Login';
import { Cadastro } from './src/pages/Cadastro/Cadastro';
import { Menu} from './src/pages/Menu/Menu';
import { Modulos } from './src/pages/Modulos/Modulos';
import { Certificados } from './src/pages/Certificados/Certificados';
import { Perfil } from './src/pages/Perfil/Perfil';
import { Configuracoes } from './src/pages/Configuracoes/Configuracoes';
import { Reset } from './src/pages/Reset/Reset';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
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
    </UserProvider>
  );
} 