import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonGroup from './buttongroup';

const WelcomeSection = () => {
  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.subtitleText}>Get started with your account</Text>
      <ButtonGroup  />
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',

  },
  subtitleText: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 5,
    textAlign: 'center',

  },
});

export default WelcomeSection;
