import React from 'react';
import { Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { Switch } from 'react-native-switch';

import { useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons.js';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type StackParamList = {
    Login: undefined;
    Cadastro: undefined;
    Menu: undefined;
}

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Configuracoes'>

import ConfiguracoesStyle from '../../styles/Configuracoes/ConfiguracoesStyle.ts';

export const Configuracoes = () => {
    const navigation = useNavigation<NavigationProps>();
    const [isNotificationsEnabled, setNotificationsEnabled] = useState(false);
    const [isDarkModeEnabled, setDarkModeEnabled] = useState(false);
    const [isUpdate, setUpdate] = useState(false);
    const [isVibration, setVibration] = useState(false);
    const [isTips, setTips] = useState(false);

    return (
        <SafeAreaView style={ConfiguracoesStyle.container}>
            <Image
                style={ConfiguracoesStyle.motociclistaConsciente}
                source={require('../../assets/moto_consciente_red.png')}
                resizeMode="contain"
            />
            <View style={ConfiguracoesStyle.content}>

                <Text style={ConfiguracoesStyle.label}>Notificações:</Text>
                <View style={ConfiguracoesStyle.switchContainer}>
                    <Text style={ConfiguracoesStyle.textoSwitch}>Ativar notificações do app:</Text>
                    <Switch
                        activeText={'On'}
                        inActiveText={'Off'}
                        circleSize={25}
                        barHeight={20}
                        circleBorderWidth={1}
                        backgroundActive={'#ed1c24'} 
                        backgroundInactive={'#bd7174'} 
                        circleActiveColor={'#f4f3f4'} 
                        circleInActiveColor={'#f4f3f4'} 
                        onValueChange={() => setNotificationsEnabled(!isNotificationsEnabled)}
                        value={isNotificationsEnabled}
                    />
                </View>

                <Text style={ConfiguracoesStyle.label}>Acessibilidade:</Text>
                <View style={ConfiguracoesStyle.switchContainer}>
                    <Text style={ConfiguracoesStyle.textoSwitch}>Modo escuro:</Text>
                    <Switch
                        activeText={'On'}
                        inActiveText={'Off'}
                        circleSize={25}
                        barHeight={20}
                        circleBorderWidth={1}
                        backgroundActive={'#ed1c24'} 
                        backgroundInactive={'#bd7174'} 
                        circleActiveColor={'#f4f3f4'} 
                        circleInActiveColor={'#f4f3f4'} 
                        onValueChange={() => setDarkModeEnabled(!isDarkModeEnabled)}
                        value={isDarkModeEnabled}
                    />
                </View>

                <View style={ConfiguracoesStyle.switchContainer}>
                    <Text style={ConfiguracoesStyle.textoSwitch}>Ativar vibração:</Text>
                    <Switch
                        activeText={'On'}
                        inActiveText={'Off'}
                        circleSize={25}
                        barHeight={20}
                        circleBorderWidth={1}
                        backgroundActive={'#ed1c24'} 
                        backgroundInactive={'#bd7174'} 
                        circleActiveColor={'#f4f3f4'} 
                        circleInActiveColor={'#f4f3f4'} 
                        onValueChange={() => setVibration(!isVibration)}
                        value={isVibration}
                    />
                </View>

                <Text style={ConfiguracoesStyle.label}>Recursos:</Text>

                <View style={ConfiguracoesStyle.switchContainer}>
                    <Text style={ConfiguracoesStyle.textoSwitch}>Permitir atualizações automáticas:</Text>
                    <Switch
                        activeText={'On'}
                        inActiveText={'Off'}
                        circleSize={25}
                        barHeight={20}
                        circleBorderWidth={1}
                        backgroundActive={'#ed1c24'} 
                        backgroundInactive={'#bd7174'} 
                        circleActiveColor={'#f4f3f4'} 
                        circleInActiveColor={'#f4f3f4'} 
                        onValueChange={() => setUpdate(!isUpdate)}
                        value={isUpdate}
                    />
                </View>

                <Text style={ConfiguracoesStyle.label}>Ajuda:</Text>
                <View style={ConfiguracoesStyle.switchContainer}>
                    <Text style={ConfiguracoesStyle.textoSwitch}>Mostrar dicas de uso :</Text>
                    <Switch
                        activeText={'On'}
                        inActiveText={'Off'}
                        circleSize={25}
                        barHeight={20}
                        circleBorderWidth={1}
                        backgroundActive={'#ed1c24'} 
                        backgroundInactive={'#bd7174'} 
                        circleActiveColor={'#f4f3f4'} 
                        circleInActiveColor={'#f4f3f4'} 
                        onValueChange={() => setTips(!isTips)}
                        value={isTips}
                    />
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Reset')} style={ConfiguracoesStyle.botaoMudarSenha}>
                    <Text style={ConfiguracoesStyle.textoMudarSenha}>Mudar senha</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={ConfiguracoesStyle.botaoDesconectar}>
                    <Text style={ConfiguracoesStyle.textoBotaoDesconectar}>Sair</Text>
                </TouchableOpacity>
            </View>

            <View style={ConfiguracoesStyle.rodape}>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={ConfiguracoesStyle.iconRodape}>
                    <Icon name="home" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


