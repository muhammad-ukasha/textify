import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackButton from "@/components/backbutton";
import axiosInstance from "../api/axiosInstance";

const OtpScreen = () => {
  const navigation = useNavigation();
  // const [loading, setLoading] = useStrate(false);

  const route = useRoute();
  const { email } = route.params;
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move to the next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index) => {
    if (index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    // Combine the OTP array into a single string or number
    const otpString = otp.join(""); // "123456"
    const otpNumber = Number(otpString); // Convert to number if needed

    if (!otpNumber || otpNumber.toString().length !== 4) {
      alert("Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      // Replace '/verify-otp' with your backend endpoint
      // console.log(otpNumber);

      const response = await axiosInstance.post("/verifyEmail", {
        email: email,
        otp: otpNumber,
      });
      if (response.status === 201) {
        // Handle success
        alert("OTP Verified Successfully!");
        navigation.navigate("meetingScreen"); // Navigate to Home or Dashboard screen
      } else {
        alert("Invalid OTP. Please try again.");
        setOtp(["", "", "", ""]);
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        alert(error.response.data.message || "Failed to verify OTP.");
      } else {
        alert("Network error. Please try again later.");
      }
    } finally {
      // setLoading(false); // Hide loader
    }
    // alert(`Submitted OTP: ${otp.join("")}`);
    // navigation.navigate("meetingScreen");
  };

  return (
    <>
      <View style={styles.container}>
        {/* Back Button */}
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />

        {/* Header */}
        <Text style={styles.header}>Meeting App</Text>

        {/* OTP Section */}
        <View style={styles.otpContainer}>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>
            Please enter the OTP sent to your email
          </Text>

          {/* OTP Inputs */}
          <View style={styles.otpInputContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    handleBackspace(index);
                  }
                }}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          {/* Resend Option */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn’t receive OTP? </Text>
            <TouchableOpacity onPress={() => alert("Resend OTP")}>
              <Text style={styles.resendLink}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <Loader visible={loading} message="Please wait..." /> */}
    </>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
    textAlign: "center",
    marginBottom: 20,
  },
  otpContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 30,
  },
  otpInput: {
    width: width * 0.15, // 15% of screen width
    height: width * 0.15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 50,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  resendText: {
    fontSize: 14,
    color: "#666",
  },
  resendLink: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default OtpScreen;
