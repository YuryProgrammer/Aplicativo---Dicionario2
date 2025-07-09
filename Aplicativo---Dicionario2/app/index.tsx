import React from 'react';
import { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

export default function Pagina_Inicial() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/searchscreen");
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu{'\n'}Amigo{'\n'}Disci</Text>

      <View style={styles.box}>
        <Image source={require("../assets/Logo.png")} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.credits}>
        <Text style={styles.creditsTitle}>Desenvolvido Por:</Text>
        <Text style={styles.creditName}>Inaldo Macena,</Text>
        <Text style={styles.creditName}>Gisele Sauderis,</Text>
        <Text style={styles.creditName}>Juliana Pereira,</Text>
        <Text style={styles.creditName}>Naiche de Medeiros,</Text>
        <Text style={styles.creditName}>Yury Pablo.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 32, fontFamily: "serif", textAlign: "center", marginBottom: 20 },
  box: { padding: 20, marginBottom: 20 },
  image: { width: 120, height: 120 },
  credits: { alignItems: "center", marginTop: 10 },
  creditsTitle: { fontWeight: "bold", marginBottom: 4 },
  creditName: { fontSize: 14 }
});
