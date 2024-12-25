import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const SignInForm = ({ formData, handleInputChange}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={formData.password}
        placeholderTextColor="#888"
        onChangeText={(text) => handleInputChange("password", text)}
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
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotPassword: {
    color: "#007bff",
    textAlign: "right",
    marginBottom: 20,
  },
});

export default SignInForm;
