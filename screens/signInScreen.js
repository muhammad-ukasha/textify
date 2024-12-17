import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import BackButton from "../components/backbutton";
import Header from "../components/header";
import SignInForm from "../components/signInForm.js";
// import PrimaryButton1 from '../components/PrimaryButton';
import Footer from "../components/signupFooter";

const SignInScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <Header />
      <View style={styles.signInSection}>
        <SignInForm />
        <TouchableOpacity
          onPress={() => navigation.navigate("signup")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        {/* <PrimaryButton1 title="Sign in" onPress={() => alert('Sign In Pressed')} /> */}
        <Footer
          title="Don't have an account?"
          link="sign UP"
          onPress={() => navigation.navigate("signup")}
        />
      </View>
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
  signInSection: {
    marginTop: 50,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignInScreen;
