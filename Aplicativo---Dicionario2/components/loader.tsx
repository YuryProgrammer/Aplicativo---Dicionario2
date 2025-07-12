import React from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';

const rotateValue = new Animated.Value(0);

Animated.loop(
  Animated.timing(rotateValue, {
    toValue: 1,
    duration: 1500,
    easing: Easing.linear,
    useNativeDriver: true,
  })
).start();

const rotation = rotateValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
});

export default function Loarder() {
  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/Logo.png')}
        style={[styles.logo, { transform: [{ rotate: rotation }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});
