import React from "react";
import { View, StyleSheet } from "react-native";
import BackButton from "../components/backbutton";
import Header from "../components/header";
import Form from "../components/signupForm";
import SignUpButton from "../components/signupButton";
// import Footer from "../components/signupFooter";

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <BackButton />
      <Header />
      <Form />
      <SignUpButton  />
      {/* <Footer /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
});

export default SignUpScreen;
