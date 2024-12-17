import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ButtonGroup = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.buttonGroup}>
    
      <TouchableOpacity onPress={() => navigation.navigate('signin')} style={styles.primaryButton}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('signup')} style={styles.secondaryButton} >
        <Text style={styles.secondaryButtonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    alignItems: 'center',
    marginVertical: 20,
    

  },
  primaryButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#555',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#ccc',
    fontWeight: 'bold',
  },
});

export default ButtonGroup;
