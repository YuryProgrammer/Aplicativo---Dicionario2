import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Loarder from "../components/loader";

export default function Pagina_Inicial() {
  const router = useRouter();
  const [exibirLoader, setExibirLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setExibirLoader(false);
      router.replace("/searchscreen");
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu{'\n'}Amigo{'\n'}Disci</Text>

      <Image
        source={require("../assets/Logo.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {exibirLoader && (
        <View style={styles.loaderContainer}>
          <Loarder />
        </View>
      )}

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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "serif",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  loaderContainer: {
    marginBottom: 40,
  },
  credits: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
  },
  creditsTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  creditName: {
    fontSize: 14,
  },
});
