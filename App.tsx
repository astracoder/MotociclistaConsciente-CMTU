import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/pages/Login/Login.tsx';
import Cadastro from './src/pages/Cadastro/Cadastro.tsx';
import Perfil from './src/pages/Perfil/Perfil.tsx';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Perfil'>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Cadastro' component={Cadastro} options={{headerShown: false}}/>
        <Stack.Screen name='Perfil' component={Perfil} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}