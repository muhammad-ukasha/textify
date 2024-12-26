import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import BackButton from "../components/backbutton";
import Header from "../components/header";
import SignInForm from "../components/signInForm.js";
// import PrimaryButton1 from '../components/PrimaryButton';
import Footer from "../components/signupFooter";
import axiosInstance from "../api/axiosInstance";
import Loader from "@/components/loader";

const SignInScreen = () => {
  const navigation = useNavigation();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!formData.email || !formData.email) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true); // Show loader

    try {
      const response = await axiosInstance.post("/sigin", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        // Handle successful login
        // const { token } = response.data; // Assuming the backend returns a token
        // await AsyncStorage.setItem("authToken", token); // Save token for future requests

        Alert.alert("Success", "Login successful!");
        navigation.navigate("meetingScreen"); // Navigate to the Home screen
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Hide loader
    }
  };
  return (
    <TouchableWithoutFeedback>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <BackButton onPress={() => navigation.goBack()} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View>
            <Header />
            <View style={styles.signInSection}>
              <SignInForm
                formData={formData}
                handleInputChange={handleInputChange}
              />
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Sign in</Text>
              </TouchableOpacity>

              {/* <PrimaryButton1 title="Sign in" onPress={() => alert('Sign In Pressed')} /> */}
            </View>
            <Footer
              title="Don't have an account?"
              link="sign UP"
              onPress={() => navigation.navigate("signup")}
            />
          </View>
          <Loader visible={loading} message="Please wait..." />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

export default SignInScreen;
