import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/header"; // Reusable Header component
import BackButton from "../components/backbutton"; // Reusable BackButton component
import PrimaryButton from "../components/primaryButton"; // Reusable PrimaryButton component
import InputField from "../components/InputField"; // Reusable InputField component
import SubHeader from "../components/subHeader";
import { useNavigation } from "expo-router";
const ForgetPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const handleSendOtp = () => {
    if (email.trim()) {
      alert(`OTP sent to: ${email}`);
      navigation.navigate();
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <BackButton onPress={() => navigation.goBack()} />

      {/* Header */}
      <Header />

      {/* Instruction Section */}
      <View style={styles.instructionContainer}>
        <SubHeader title="Forget Password" style={styles.title} />
        <SubHeader
          title="To receive OTP on your email, please enter your email below"
          style={styles.subtitle}
        />
      </View>

      {/* Email Input */}
      <InputField
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Send OTP Button */}
      <PrimaryButton title="Send OTP" onPress={handleSendOtp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  instructionContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ForgetPasswordScreen;
