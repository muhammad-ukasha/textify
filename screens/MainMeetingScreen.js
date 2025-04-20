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


// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { useRoute } from "@react-navigation/native"; // Use useRoute to get params
// import { useNavigation } from "@react-navigation/native"; // To navigate or go back

// const MainMeetingScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { meetingCode } = route.params; // Get the meetingCode from the params

//   const [isRecording, setIsRecording] = useState(false);

//   // Start or stop recording
//   const handleToggleRecording = () => {
//     setIsRecording(!isRecording);
//     console.log(isRecording ? "Stopping recording..." : "Starting recording...");
//   };

//   const handleEndMeeting = () => {
//     console.log(`Ending meeting with code: ${meetingCode}`);
//     // Navigate to the meeting list or another screen when the meeting ends
//     navigation.navigate("meetingScreen");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Main Meeting Screen</Text>
//       <Text style={styles.subtitle}>Meeting Code: {meetingCode}</Text>

//       {/* Placeholder for meeting content */}
//       <View style={styles.meetingContent}>
//         <Text style={styles.meetingContentText}>This is where the meeting content will be displayed.</Text>
//       </View>

//       {/* Controls */}
//       <TouchableOpacity style={styles.recordButton} onPress={handleToggleRecording}>
//         <Text style={styles.recordButtonText}>{isRecording ? "Stop Recording" : "Start Recording"}</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.endButton} onPress={handleEndMeeting}>
//         <Text style={styles.endButtonText}>End Meeting</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#007AFF",
//   },
//   subtitle: {
//     fontSize: 18,
//     color: "#333",
//     marginTop: 10,
//   },
//   meetingContent: {
//     width: "80%",
//     height: 200,
//     backgroundColor: "#f0f8ff",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 30,
//     borderRadius: 10,
//   },
//   meetingContentText: {
//     fontSize: 18,
//     color: "#333",
//   },
//   recordButton: {
//     marginTop: 30,
//     backgroundColor: "#007AFF",
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 6,
//     alignItems: "center",
//   },
//   recordButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   endButton: {
//     marginTop: 20,
//     backgroundColor: "#f44336",
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 6,
//     alignItems: "center",
//   },
//   endButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default MainMeetingScreen;
