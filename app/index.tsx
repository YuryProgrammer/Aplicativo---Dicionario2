import React from "react";
import { useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function WelcomeScreen() {
    const router = useRouter()
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Meu Amigo{'\n'}Disci!</Text>

            <TouchableOpacity onPress={() => router.push('/SearchScreen')}>
                <Image
                source={require('../assets/Logo_Disci.jpg')} 
                style={styles.image}
                />
            </TouchableOpacity>

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
