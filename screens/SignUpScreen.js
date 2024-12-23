import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native";
import BackButton from "../components/backbutton";
import Header from "../components/header";
import Form from "../components/signupForm";
import SignUpButton from "../components/signupButton";
import Footer from "../components/signupFooter";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();

  const handleSignup = () => {
    // TODO: Implement signup logic here
    navigation.navigate("otpScreen");
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header />
            <Form />
            <SignUpButton onPress={handleSignup} />
            <Footer
              title="Already have Account?"
              link="signIn"
              onPress={() => navigation.navigate("signin")}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

export default SignUpScreen;
