import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function WelcomeScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Meu Amigo{'\n'}Disci!</Text>

        <Image
        source={require('../assets/Logo_Disci.jpg')} 
        style={styles.image}
        />

        <Text style={styles.credits}>
            Desenvolvido por:{'\n'}
            Inaldo Macena,{'\n'}
            Gisele Sauderis,{'\n'}
            Juliana Pereira,{'\n'}
            Naiche de Medeiros,{'\n'}
            Yury Pablo.{'\n'}
        </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor:'#D7E8F7',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium',
        textAlign: 'center',
        marginBottom: 40,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 40,
    },
    credits: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
});
