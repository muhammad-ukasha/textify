// import React from "react";
import React, { useState } from "react";

import { View, TextInput, StyleSheet, Text } from "react-native";

const Form = ({ formData, onInputChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.subtitle}>Enter your information</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { marginRight: 10 }]}
          placeholder="First Name"
          value={formData.firstName}
          onChangeText={(text) => onInputChange("firstName", text)}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={formData.lastName}
          onChangeText={(text) => onInputChange("lastName", text)}
          placeholderTextColor="#888"
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => onInputChange("email", text)}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => onInputChange("password", text)}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(text) => onInputChange("confirmPassword", text)}
        placeholderTextColor="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 30,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default Form;
