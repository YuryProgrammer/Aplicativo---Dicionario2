import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import WelcomeScreen from './Telas/Welcomescreen';
import SearchScreen from './Telas/SearchScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1}}>

      <WelcomeScreen />
      <SearchScreen />

      </SafeAreaView>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
// atualizar 