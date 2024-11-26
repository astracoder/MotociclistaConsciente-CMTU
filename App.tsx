import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './src/context/UserContext';

import { Login } from './src/pages/Login/Login';
import { Cadastro } from './src/pages/Cadastro/Cadastro';
import { Menu} from './src/pages/Menu/Menu';
import { Modulos } from './src/pages/Modulos/Modulos';
import { Certificados } from './src/pages/Certificados/Certificados';
import { Perfil } from './src/pages/Perfil/Perfil';
import { Configuracoes } from './src/pages/Configuracoes/Configuracoes';
import { Reset } from './src/pages/Reset/Reset';

import { UsuarioAdmin } from './src/pagesAdmin/Usuario/UsuarioAdmin';
import { UsuarioAddAdmin } from './src/pagesAdmin/Usuario/UsuarioAddAdmin';
import { UsuarioEditDeleteAdmin } from './src/pagesAdmin/Usuario/UsuarioEditDeleteAdmin';

import { ModuloAdmin } from './src/pagesAdmin/Modulo/ModuloAdmin';
import { ModuloAddAdmin } from './src/pagesAdmin/Modulo/ModuloAddAdmin';
import { ModuloEditDeleteAdmin } from './src/pagesAdmin/Modulo/ModuloEditDeleteAdmin';

import { UsuarioModuloAdmin } from './src/pagesAdmin/UsuarioModulo/UsuarioModuloAdmin';

import { AtividadeAdmin } from './src/pagesAdmin/Atividade/AtividadeAdmin';
import { AtividadeAddAdmin } from './src/pagesAdmin/Atividade/AtividadeAddAdmin';
import { AtividadeEditDeleteAdmin } from './src/pagesAdmin/Atividade/AtividadeEditDeleteAdmin';

import { AlternativaAdmin } from './src/pagesAdmin/Alternativa/AlternativaAdmin';

import { CertificadoAdmin } from './src/pagesAdmin/Certificado/CertificadoAdmin';


export type StackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Menu: undefined;
  Modulos: undefined;
  Certificados: undefined;
  Perfil: undefined
  Reset: undefined
  Configuracoes: undefined;

  UsuarioAdmin: undefined;
  UsuarioAddAdmin: undefined;
  UsuarioEditDeleteAdmin: { id: number, nome: string, email: string, senha: string };

  ModuloAdmin: undefined;
  ModuloAddAdmin: undefined;
  ModuloEditDeleteAdmin: { id: number, nomeModulo: string, porcentagem: string };

  UsuarioModuloAdmin: undefined;

  AtividadeAdmin: undefined;
  AtividadeAddAdmin: undefined;
  AtividadeEditDeleteAdmin: {id: number, texto: string, fk_id: number};

  AlternativaAdmin: undefined;

  CertificadoAdmin: undefined;

};

const Stack = createNativeStackNavigator<StackParamList>();

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

          <Stack.Screen name='UsuarioAdmin' component={UsuarioAdmin} options={{headerShown: false}}/>
          <Stack.Screen name='UsuarioAddAdmin' component={UsuarioAddAdmin} options={{headerShown: false}}/>
          <Stack.Screen name='UsuarioEditDeleteAdmin' component={UsuarioEditDeleteAdmin} options={{headerShown: false}}/>

          <Stack.Screen name='ModuloAdmin' component={ModuloAdmin} options={{headerShown: false}}/>
          <Stack.Screen name='ModuloAddAdmin' component={ModuloAddAdmin} options={{headerShown: false}}/>
          <Stack.Screen name='ModuloEditDeleteAdmin' component={ModuloEditDeleteAdmin} options={{headerShown: false}}/>

          <Stack.Screen name='UsuarioModuloAdmin' component={UsuarioModuloAdmin} options={{headerShown: false}}/>

          <Stack.Screen name='AtividadeAdmin' component={AtividadeAdmin} options={{headerShown: false}}/>
          <Stack.Screen name='AtividadeAddAdmin' component={AtividadeAddAdmin} options={{headerShown: false}}/>
          <Stack.Screen name='AtividadeEditDeleteAdmin' component={AtividadeEditDeleteAdmin} options={{headerShown: false}}/>

          <Stack.Screen name='AlternativaAdmin' component={AlternativaAdmin} options={{headerShown: false}}/>

          <Stack.Screen name='CertificadoAdmin' component={CertificadoAdmin} options={{headerShown: false}}/>
          
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>

  );
} 