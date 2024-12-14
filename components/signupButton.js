import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const   SignUpButton = () => {
  return (
    <TouchableOpacity style={styles.button} >
      <Text style={styles.text}>Sign Up</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SignUpButton;
