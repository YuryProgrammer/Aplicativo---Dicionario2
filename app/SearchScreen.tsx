import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Api from '../services/Api'
import { useRouter } from "expo-router";

 export default function SearchScreen (){
    const [idioma, setIdioma] = useState ('');
    const [palavra, setPalavra] = useState ('');
    const router = useRouter()
   
    async function buscarPalavra(){
        const traducao= await Api.get(`/${idioma}/${palavra}`)
        router.push('/')
    }
    return ( 
        <ScrollView>
            <View style= {styles.container}>
                <Text style= {styles.title}>Meu Amigo Disci!</Text>

                <Image
                source= {require('../assets/Logo_Disci.jpg')}
                style= {styles.image}
                />

                <View style= {styles.inputGroup}>
                    <Text style= {styles.label}>SELECIONE O IDIOMA</Text>
                    <View style= {styles.inputWithIcon}>
                        <TextInput
                        placeholder="Ex: Português"
                        style={styles.input}
                        value={idioma}
                        onChangeText={setIdioma}
                        />
                        <Image
                        source={require('../assets/search.png')}
                        style={styles.icon}
                        />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>PALAVRA:</Text>
                <View style= {styles.inputWithIcon}>
                    <TextInput
                    placeholder="Digite a palavra"
                    style={styles.input}
                    onChangeText={setPalavra}
                    />

                    <Image
                    source={require('../assets/search.png')}
                    style={styles.icon}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}onPress={buscarPalavra}>PESQUISAR</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    );

 }

 const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#D7E8F7',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20, 
    },
    title:{
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign:'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 30,
    },
    inputGroup: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingHorizontal: 10, 
        elevation: 2,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
    }, 
    icon: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 30,
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
 });