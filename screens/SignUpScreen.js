import React from "react";
import { View, StyleSheet } from "react-native";
import BackButton from "../components/backbutton";
import Header from "../components/header";
import Form from "../components/signupForm";
import SignUpButton from "../components/signupButton";
import Footer from "../components/signupFooter";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <Header />
      <Form />
      <SignUpButton />
      <Footer
        title="Already have Account?"
        link="signIn"
        onPress={() => navigation.navigate("signin")}
      />
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
