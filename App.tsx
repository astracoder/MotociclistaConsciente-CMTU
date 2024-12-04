//Imports para funcionar a navegação entre páginas
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './src/context/UserContext';

//Paginas do aplicativo
import { Login } from './src/pages/Login/Login';
import { Cadastro } from './src/pages/Cadastro/Cadastro';
import { Menu} from './src/pages/Menu/Menu';
import { Modulos } from './src/pages/Modulos/Modulos';
import { Perguntas } from './src/pages/Perguntas/Perguntas';
import { Pontuacao } from './src/pages/Pontuacao/Pontuacao';
import { Certificados } from './src/pages/Certificados/Certificados';
import { Perfil } from './src/pages/Perfil/Perfil';
import { Configuracoes } from './src/pages/Configuracoes/Configuracoes';
import { Reset } from './src/pages/Reset/Reset';

// Paginas Admin
import { UsuarioAdmin } from './src/pagesAdmin/Usuario/UsuarioAdmin';
import { UsuarioAddAdmin } from './src/pagesAdmin/Usuario/UsuarioAddAdmin';
import { UsuarioEditDeleteAdmin } from './src/pagesAdmin/Usuario/UsuarioEditDeleteAdmin';

import { ModuloAdmin } from './src/pagesAdmin/Modulo/ModuloAdmin';
import { ModuloAddAdmin } from './src/pagesAdmin/Modulo/ModuloAddAdmin';
import { ModuloEditDeleteAdmin } from './src/pagesAdmin/Modulo/ModuloEditDeleteAdmin';

import { UsuarioModuloAdmin } from './src/pagesAdmin/UsuarioModulo/UsuarioModuloAdmin';
import { UsuarioModuloAddAdmin } from './src/pagesAdmin/UsuarioModulo/UsuarioModuloAddAdmin';
import { UsuarioModuloEditDeleteAdmin } from './src/pagesAdmin/UsuarioModulo/UsuarioModuloEditDeleteAdmin';

import { AtividadeAdmin } from './src/pagesAdmin/Atividade/AtividadeAdmin';
import { AtividadeAddAdmin } from './src/pagesAdmin/Atividade/AtividadeAddAdmin';
import { AtividadeEditDeleteAdmin } from './src/pagesAdmin/Atividade/AtividadeEditDeleteAdmin';

import { AlternativaAdmin } from './src/pagesAdmin/Alternativa/AlternativaAdmin';
import { AlternativaAddAdmin } from './src/pagesAdmin/Alternativa/AlternativaAddAdmin';
import { AlternativaEditDeleteAdmin } from './src/pagesAdmin/Alternativa/AlternativaEditDeleteAdmin';

import { CertificadoAdmin } from './src/pagesAdmin/Certificado/CertificadoAdmin';
import { CertificadoAddAdmin } from './src/pagesAdmin/Certificado/CertificadoAddAdmin';
import { CertificadoEditDeleteAdmin } from './src/pagesAdmin/Certificado/CertificadoEditDeleteAdmin';

import { DataScienceAdmin } from './src/pagesAdmin/DataScience/DataScienceAdmin';

//Tipagem das paginas
export type StackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Menu: undefined;
  Modulos: undefined;
  Perguntas: { idModulo: number };
  Pontuacao: { pontuacao: number };
  Certificados: undefined;
  Perfil: undefined
  Reset: undefined
  Configuracoes: undefined;

  UsuarioAdmin: undefined;
  UsuarioAddAdmin: undefined;
  UsuarioEditDeleteAdmin: { id: number, status: number, nome: string, email: string, senha: string };

  ModuloAdmin: undefined;
  ModuloAddAdmin: undefined;
  ModuloEditDeleteAdmin: { id: number, status: number, nomeModulo: string, porcentagem: string };

  UsuarioModuloAdmin: undefined;
  UsuarioModuloAddAdmin: undefined;
  UsuarioModuloEditDeleteAdmin: {id: number, status: number, aprovado: number, iniciado: number, nota_final: number};

  AtividadeAdmin: undefined;
  AtividadeAddAdmin: undefined;
  AtividadeEditDeleteAdmin: {id: number, status: number, texto: string, fk_id: number};

  AlternativaAdmin: undefined;
  AlternativaAddAdmin: undefined;
  AlternativaEditDeleteAdmin: {id: number, status: number, texto: string}

  CertificadoAdmin: undefined;
  CertificadoAddAdmin: {idUsuario: any};
  CertificadoEditDeleteAdmin: {id: number, status: number, texto: string, horas: number, dataConclusao: Date};

  DataScienceAdmin: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

//Todas as rotas do App
export default function App() {
  return (
    <UserProvider>  
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
          <Stack.Screen name='Cadastro' component={Cadastro} options={{headerShown: false}}/>
          <Stack.Screen name='Menu' component={Menu} options={{headerShown: false}}/>
          <Stack.Screen name='Modulos' component={Modulos} options={{headerShown: false}}/>
          <Stack.Screen name='Perguntas' component={Perguntas} options={{headerShown: false}}/>
          <Stack.Screen name='Pontuacao' component={Pontuacao} options={{headerShown: false}}/>
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
          <Stack.Screen name='UsuarioModuloAddAdmin' component={UsuarioModuloAddAdmin} options={{headerShown: false}}/>
          <Stack.Screen name='UsuarioModuloEditDeleteAdmin' component={UsuarioModuloEditDeleteAdmin} options={{headerShown: false}}/>

          <Stack.Screen name='AtividadeAdmin' component={AtividadeAdmin} options={{headerShown: false}}/>
          <Stack.Screen name='AtividadeAddAdmin' component={AtividadeAddAdmin} options={{headerShown: false}}/>
          <Stack.Screen name='AtividadeEditDeleteAdmin' component={AtividadeEditDeleteAdmin} options={{headerShown: false}}/>

          <Stack.Screen name='AlternativaAdmin' component={AlternativaAdmin} options={{headerShown: false}}/>
          <Stack.Screen name='AlternativaAddAdmin' component={AlternativaAddAdmin} options={{headerShown: false}}/>
          <Stack.Screen name='AlternativaEditDeleteAdmin' component={AlternativaEditDeleteAdmin} options={{headerShown: false}}/>

          <Stack.Screen name='CertificadoAdmin' component={CertificadoAdmin} options={{headerShown: false}}/>
          <Stack.Screen name='CertificadoAddAdmin' component={CertificadoAddAdmin} options={{headerShown: false}}/>
          <Stack.Screen name='CertificadoEditDeleteAdmin' component={CertificadoEditDeleteAdmin} options={{headerShown: false}}/>

          <Stack.Screen name='DataScienceAdmin' component={DataScienceAdmin} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>

  );
} 