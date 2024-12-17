import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SignInForm = () => {
  return (
    <View>
      <TextInput 
        placeholder="Email Address"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        placeholder="Password"
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forget Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotPassword: {
    color: '#007bff',
    textAlign: 'right',
    marginBottom: 20,
  },
});

export default SignInForm;
