import { Text, SafeAreaView, Image } from 'react-native';
import Global from '../../stylesAdmin/Global/globalStyles';

export const DataScienceAdmin = () => {

  return (
    <SafeAreaView>
        <Text>Data Science</Text>

        <Image  
          source={require('../../assets/DataScience/grafico_acertos.png')} 
          resizeMode="contain" 
        />

    </SafeAreaView>
  );
};