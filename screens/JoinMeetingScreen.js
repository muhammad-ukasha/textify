import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const JoinMeetingScreen = () => {
  const [meetingCode, setMeetingCode] = useState(""); // State to hold the meeting code
  const navigation = useNavigation();

  // Regex to validate meeting code for both formats: xxx xxx xxx xxx and xxx-xxx-xxx-xxx
  const meetingCodeRegex = /^(\d{3} \d{3} \d{3} \d{3}|\d{3}-\d{3}-\d{3}-\d{3})$/;

  const handleJoinMeeting = () => {
    // Check if the meeting code matches the standard format
    if (meetingCodeRegex.test(meetingCode)) {
      // If valid, navigate to MainMeetingScreen and pass the meeting code
      console.log(`Joining meeting with code: ${meetingCode}`);
      navigation.navigate("MainMeetingScreen", { meetingCode }); // Pass meetingCode as a parameter
    } else {
      // If invalid, show an alert
      Alert.alert("Invalid Code", "Please enter a valid meeting code in the format: xxx xxx xxx xxx or xxx-xxx-xxx-xxx");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Meeting App</Text>
        <Text style={styles.subtitle}>Join a meeting</Text>
        <Text style={styles.description}>Get started by entering code</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter code or link"
        value={meetingCode}
        onChangeText={setMeetingCode}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.joinButton} onPress={handleJoinMeeting}>
        <Text style={styles.joinButtonText}>Join</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  backText: {
    fontSize: 20,
    color: "#007AFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  joinButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default JoinMeetingScreen;
