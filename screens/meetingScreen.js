import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";

const MeetingScreen = () => {
  const navigation = useNavigation();
  const [meetings, setMeetings] = useState([
    {
      id: "1",
      title: "Final Milestone",
      date: "Mon, Jan 12 - 2025",
      time: "01:30 PM – 02:30 PM",
      meetingId: "715 3281 0157",
      organizer: "Rayyan Khan",
      subject: "To understand the scrum concept",
      when: "Thu, 2024-12-26 2 PM – 2 PM (PST)",
      description:
        "To understand and clear the concept which is covered in class",
      participants: [
        "Taha Mallick",
        "M. Okasha",
        "Anas Nasir",
        "Areeb Bin Zubair",
      ],
    },
    {
      id: "2",
      title: "Product Update 1.0",
      date: "Wed, Dec 25 – 2025",
      time: "08:30 AM – 09:00 AM",
      meetingId: "715 3281 0158",
      organizer: "Sarah Lee",
      subject: "Product features discussion",
      when: "Wed, 2025-12-25 8:30 AM – 9:00 AM (PST)",
      description:
        "Discussing the new features in the upcoming product release.",
      participants: ["John Doe", "Jane Smith", "Emily Davis"],
    },
  ]);

  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openDetails = (meeting) => {
    setSelectedMeeting(meeting);
    setModalVisible(true);
  };

  const closeDetails = () => {
    setSelectedMeeting(null);
    setModalVisible(false);
  };

  const dismissMeeting = (meetingId) => {
    setMeetings((prevMeetings) =>
      prevMeetings.filter((meeting) => meeting.id !== meetingId)
    );
    if (selectedMeeting && selectedMeeting.id === meetingId) {
      closeDetails();
    }
  };

  const renderMeetingItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.meetingId}>Meeting ID: {item.meetingId}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MainMeetingScreen")}
          style={styles.joinButton}
        >
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => openDetails(item)}
        >
          <Text style={styles.buttonText}>Show Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dismissButton}
          onPress={() => dismissMeeting(item.id)}
        >
          <Text style={styles.buttonText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenHeading}>Meetings</Text>
      <FlatList
        data={meetings}
        keyExtractor={(item) => item.id}
        renderItem={renderMeetingItem}
        contentContainerStyle={styles.listContent}
      />

      {/* Modal for Meeting Details */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeDetails}
      >
        <View style={styles.overlay}>
          <View style={styles.popupBox}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeDetails}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modalHeading}>Meeting details</Text>

            <Text style={styles.label}>
              Organizer:{" "}
              <Text style={styles.value}>{selectedMeeting?.organizer}</Text>
            </Text>
            <Text style={styles.label}>
              Subject:{" "}
              <Text style={styles.value}>{selectedMeeting?.subject}</Text>
            </Text>
            <Text style={styles.label}>
              When: <Text style={styles.value}>{selectedMeeting?.when}</Text>
            </Text>
            <Text style={styles.label}>
              Description:{" "}
              <Text style={styles.value}>{selectedMeeting?.description}</Text>
            </Text>
            <Text style={styles.label}>Participants:</Text>
            {selectedMeeting?.participants.map((name, index) => (
              <Text key={index} style={styles.value}>
                • {name}
              </Text>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MeetingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  screenHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#f0f8ff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  date: {
    fontSize: 14,
    color: "#555",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  meetingId: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  joinButton: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
  },
  detailsButton: {
    backgroundColor: "#2196f3",
    padding: 10,
    borderRadius: 5,
  },
  dismissButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupBox: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 1,
  },
  modalHeading: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 14,
  },
  value: {
    fontWeight: "normal",
    fontSize: 14,
  },
});
