import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DemoAudioScreen = () => {
  const navigation = useNavigation();

  const handleStart = () => {
    // Implement the action for the start button
    navigation.navigate("RecordingScreen")    
    console.log("Recording started");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Demo Audio</Text>
      <Text style={styles.description}>
        Please record your voice demo by clicking on start
      </Text>

      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startText}>START</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backText: {
    fontSize: 20,
    color: "#007aff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: "#007aff",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 50,
  },
  startText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DemoAudioScreen;
