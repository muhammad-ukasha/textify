import React, { useState } from "react";
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
import axiosInstance from "../api/axiosInstance"; // Axios instance
import Loader from "../components/loader";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // console.log(formData);
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const handleSignup = async () => {
    
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      formData.password !== formData.confirmPassword
    ) {
      alert("Please fill all fields correctly.");
      return;
    }

    // setLoading(true); // Show loader

    try {
      // Make POST request using Axios
      console.log(formData)
      const response = await axiosInstance.post("/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword : formData.confirmPassword,
      });
      console.log(response)  
      // Han  dle success
      if (response.status === 200) {
        console.log('a')
        alert("Sign Up Successful!");
        navigation.navigate("otpScreen" , {email : formData.email} ); // Navigate to Sign In screen
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        // Server responded with a status other than 200
        alert(error.response.data.message || "Something went wrong!");
      } else if (error.request) {
        // Request was made but no response received
        alert("No response from the server. Please try again later.");
      } else {
        // Something else happened
        alert("An error occurred. Please try again.");
      }
    } finally {
      // setLoading(false); // Hide loader
    }

    // TODO: Implement signup logic here
    // navigation.navigate("otpScreen");
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
            <Form formData={formData} onInputChange={handleInputChange} />
            <SignUpButton onPress={handleSignup} />
            <Footer
              title="Already have Account?"
              link="signIn"
              onPress={() => navigation.navigate("signin")}
            />
            <Loader visible={loading} message="Please wait..." />
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
