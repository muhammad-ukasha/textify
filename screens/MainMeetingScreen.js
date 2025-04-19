import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loader from "../components/loader"; // Adjust the path as necessary

const MeetingScreen = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState("");
  const navigation = useNavigation();
  const ESP32_IP = "192.168.49.227";
  const startRecording = async () => {
    setLoading(true); // Show loader
    try {
      const response = await axios.get(`http://${ESP32_IP}/start`);
      setRecordingStatus("Recording started...");
      console.log("Recording started:", response.data);
    } catch (error) {
      console.error("Error starting recording:", error);
      setRecordingStatus("Error starting recording");

    } finally {
      setLoading(false); // Hide loader
    }
  };
  const stopRecording = async () => {
    setLoading(true); // Show loader

    try {
      const response = await axios.get(`http://${ESP32_IP}/stop`);
      console.log("Recording stopped:", response.data);
      setRecordingStatus('Recording stopped')
      navigation.navigate("meetingScreen");
    } catch (error) {
      console.error("Error stopping recording:", error);
      setRecordingStatus('Error stopping recording')

    } finally {
      setLoading(false); // Hide loader
    }
  };
  const handleTranscriptPage = () => {
    startRecording();
  };
  const handleEndMeeting = () => {
    stopRecording();
  };
  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      )}
      {/* Header */}
      <Text style={styles.title}>Product Launch</Text>

      {/* Participant Boxes */}
      <ScrollView contentContainerStyle={styles.boxContainer}>
        <View style={styles.participantBox}>
          <Text>Exodus (Host)</Text>
        </View>
        <View style={styles.participantBox}>
          <Text>Areeb</Text>
        </View>
        <View style={styles.participantBox}>
          <Text>Asim</Text>
        </View>
        <View style={styles.participantBox}>
          <Text>Anas (You)</Text>
        </View>
      </ScrollView>
      {/* Recording Status */}
      <View style={styles.statusBox}>
        <Text style={styles.statusText}>{recordingStatus}</Text>
      </View>
      {/* Bottom Toolbar */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
          <Ionicons name="information-circle" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTranscriptPage}>
          <Ionicons name="copy" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("TranscriptPage")}>
          <Ionicons name="document-text" size={28} color="black" />
        </TouchableOpacity>

        <Ionicons name="mic" size={28} color="black" />
        <TouchableOpacity onPress={handleEndMeeting}>
          <Ionicons name="call" size={28} color="red" />
        </TouchableOpacity>
      </View>

      {/* Info Box */}
      {showInfo && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            This is a Product Launch meeting. Exodus is the host. You are
            currently viewing the participant list.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
    position: "relative",
  },
  loaderContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  boxContainer: {
    paddingBottom: 100,
  },
  participantBox: {
    height: 80,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  statusBox: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    alignItems: "center",
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  infoBox: {
    position: "absolute",
    bottom: 90,
    left: 20,
    right: 20,
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    zIndex: 10,
  },
  infoText: {
    fontSize: 15,
    color: "#333",
  },
});

export default MeetingScreen;
