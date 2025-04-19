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
    },
    {
      id: "2",
      title: "Product Update 1.0",
      date: "Wed, Dec 25 – 2025",
      time: "08:30 AM – 09:00 AM",
      meetingId: "715 3281 0158",
    },
  ]);

  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [chooseOptionModal, setChooseOptionModal] = useState(false); // Popup modal state

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

  const handleStartMeeting = () => {
    setChooseOptionModal(true); // Show the option modal when Start Meeting is clicked
  };

  const handleInstantMeeting = () => {
    setChooseOptionModal(false);
    // Handle Instant Meeting logic here (e.g., navigate to a meeting screen)
    console.log("Instant Meeting");
  };

  const handleScheduleMeeting = () => {
    setChooseOptionModal(false);
    // Handle Schedule Meeting logic here (e.g., navigate to scheduling screen)
    console.log("Schedule Meeting");
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meeting App</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={[styles.headerBtn, styles.headerBtnFilled]}
            onPress={handleStartMeeting} // Trigger the option modal when Start Meeting is clicked
          >
            <Text style={[styles.headerBtnText, styles.headerBtnTextLight]}>
              Start Meeting
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerBtn, styles.headerBtnOutline]}
            onPress={() => navigation.navigate("JoinMeetingScreen")}
          >
            <Text style={[styles.headerBtnText, styles.headerBtnPrimary]}>
              Join a Meeting
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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

      {/* Choose Option Popup */}
      <Modal
        visible={chooseOptionModal}
        transparent
        animationType="fade"
        onRequestClose={() => setChooseOptionModal(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.popupBox}>
            <Text style={styles.popupTitle}>Choose your option</Text>
            <TouchableOpacity
              style={[styles.optionButton, styles.optionButtonFilled]}
              onPress={handleInstantMeeting}
            >
              <Text style={styles.optionButtonText}>Instant Meeting</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, styles.optionButtonOutline]}
              onPress={handleScheduleMeeting}
            >
              <Text style={styles.optionButtonText}>Schedule Meeting</Text>
            </TouchableOpacity>
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
  header: {
    backgroundColor: "#FAFAFA", // white color for the top curve
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 20,
  },
  headerTitle: {
    color: "#007AFF", // blue color for header text
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  headerBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  headerBtnFilled: {
    backgroundColor: "#007AFF", // Start Meeting button background (blue)
  },
  headerBtnOutline: {
    borderWidth: 1.5,
    borderColor: "#007AFF", // Join Meeting button border (blue)
    backgroundColor: "transparent",
  },
  headerBtnText: {
    fontSize: 14,
    fontWeight: "600",
  },
  headerBtnTextLight: {
    color: "#fff",
  },
  headerBtnPrimary: {
    color: "#007AFF", // Join Meeting button text
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
    backgroundColor: "#007AFF", // Blue button for Join
    padding: 10,
    borderRadius: 5,
  },
  detailsButton: {
    backgroundColor: "#2196f3", // Blue button for Show Details
    padding: 10,
    borderRadius: 5,
  },
  dismissButton: {
    backgroundColor: "#f44336", // Red button for Dismiss
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
  popupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginVertical: 8,
  },
  optionButtonFilled: {
    backgroundColor: "#007AFF",
  },
  optionButtonOutline: {
    borderWidth: 1.5,
    borderColor: "#007AFF",
    backgroundColor: "transparent",
  },
  optionButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

