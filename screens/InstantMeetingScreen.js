import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const InstantMeetingScreen = ({ navigation }) => { // Ensure `navigation` prop is passed here
  const [meetingName, setMeetingName] = useState("");
  const [meetingSubject, setMeetingSubject] = useState("");
  const [participants, setParticipants] = useState([]);
  const [participant, setParticipant] = useState("");
  const [description, setDescription] = useState("");

  const handleAddParticipant = () => {
    if (participant) {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
      setParticipant("");
    }
  };

  const handleStartMeeting = () => {
    // Handle the start of the meeting here (e.g., navigate to the meeting screen)
    console.log("Meeting Started:", { meetingName, meetingSubject, participants, description });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Use navigation.goBack() to go back to the previous screen
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Meeting App</Text>
        <Text style={styles.subtitle}>Start a meeting</Text>
        <Text style={styles.description}>Enter your meeting topic</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Meeting Name"
        value={meetingName}
        onChangeText={setMeetingName}
      />
      <TextInput
        style={styles.input}
        placeholder="Meeting Subject"
        value={meetingSubject}
        onChangeText={setMeetingSubject}
      />

      <View style={styles.participantsContainer}>
        <Text style={styles.label}>Participants</Text>
        <View style={styles.participantInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add participant"
            value={participant}
            onChangeText={setParticipant}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddParticipant}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        {participants.length > 0 && (
          <View style={styles.participantsList}>
            {participants.map((p, index) => (
              <Text key={index} style={styles.participantItem}>
                {p}
              </Text>
            ))}
          </View>
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.startButton} onPress={handleStartMeeting}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 20,
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
    marginBottom: 15,
    fontSize: 16,
  },
  participantsContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },
  participantInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  participantsList: {
    marginTop: 10,
  },
  participantItem: {
    fontSize: 16,
    color: "#333",
  },
  startButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default InstantMeetingScreen;
