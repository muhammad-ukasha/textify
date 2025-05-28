import { useNavigation } from "expo-router";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native"; // Optional: reload on focus
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
// import InstantMeetingScreen from "./InstantMeetingScreen";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";

const API_URL = "https://6686-43-246-221-125.ngrok-free.app";

const MeetingScreen = () => {
  const dummyMeetings = [
    {
      _id: "dummy-1",
      title: "Demo Meeting",
      date: "Mon, Jan 1 - 2025",
      time: "10:00 AM – 11:00 AM",
      meetingId: "000 111 222",
      organizer: "Demo User",
      subject: "Demo Subject",
      description: "This is a dummy meeting loaded due to error.",
      participants: [
        { id: "p1", email: "john@example.com" },
        { id: "p2", email: "jane@example.com" },
      ],
    },
  ];

  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("");
  const [allMeetings, setAllMeetings] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const fetchMeetings = async () => {
        try {
          const storedUser = await AsyncStorage.getItem("userData");
          const parsedUser = JSON.parse(storedUser);
          const email = parsedUser?.id;
          setUserEmail(email);
          // console.log(email)
          const res = await axiosInstance.get("/list-meeting");
          const meetingsFromServer = res.data;
          // Filter meetings where user is a participant
          console.log("1", meetingsFromServer[0]);
          console.log("2", email);

          const userMeetings = meetingsFromServer.filter((meeting) =>
            // console.log(meeting.participants)
            meeting.participants.some((p) => p.user._id === email)
          );
          console.log(meetingsFromServer);
          setAllMeetings(userMeetings);
          // console.log(meetingsFromServer.participants[0]);
        } catch (error) {
          setAllMeetings(dummyMeetings);
          console.error("Error fetching meetings:", error.message);
        }
      };

      fetchMeetings();
    }, [])
  );
  // console.log(allMeetings)
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [chooseOptionModal, setChooseOptionModal] = useState(false); // Popup modal state
  const handleViewSummary = async (meetingId) => {
    try {
      // Make API call to get summary text file for the given meetingId
      const res = await axios.get(`${API_URL}/meeting-summary/${meetingId}`, {
        responseType: "text",
      });
      const summaryText = res.data.summary; // Assuming the API returns { summary: "text content" }

      if (!summaryText) {
        alert("Summary is not available for this meeting.");
        return;
      }

      // Navigate to summary screen with summaryText as param
      navigation.navigate("MeetingSummaryScreen", { summaryText, meetingId });
    } catch (error) {
      console.error("Error fetching summary:", error.message);
      alert("Failed to load meeting summary.");
    }
  };

  const openDetails = (meeting) => {
    setSelectedMeeting(meeting);
    setModalVisible(true);
  };

  const closeDetails = () => {
    setSelectedMeeting(null);
    setModalVisible(false);
  };

  const dismissMeeting = (meetingId) => {
    setAllMeetings((prevMeetings) =>
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
    navigation.navigate("InstantMeetingScreen");
    setChooseOptionModal(false);
    console.log("Instant Meeting");
  };

  const handleScheduleMeeting = () => {
    navigation.navigate("ScheduleMeetingScreen"); // This navigates to the ScheduleMeetingScreen
    setChooseOptionModal(false);
    console.log("Schedule Meeting");
  };

  const renderMeetingItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={styles.meetingId}>Meeting ID: {item.meetingId}</Text>
        <View
          style={[
            styles.statusBadge,
            item.status === "started"
              ? styles.statusStarted
              : styles.statusPending,
          ]}
        >
          <Text style={styles.statusBadgeText}>
            {item.status === "started" ? "Started" : "completed"}
          </Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => {
            console.log(item.status);
            if (item.status === "started") {
              navigation.navigate("MainMeetingScreen", { meeting: item });
            } else {
              alert("Meeting has not started yet.");
            }
          }}
          style={styles.joinButton}
        >
          <Text style={styles.buttonText}>Join </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => openDetails(item)}
        >
          <Text style={styles.buttonText}>Show Details </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailsButton} // reuse detailsButton styling or create new style if you want
          onPress={() => handleViewSummary(item._id)}
        >
          <Text style={styles.buttonText}>View Summary </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meeting App</Text>
        <View style={styles.headerButtons}></View>
      </View>

      <Text style={styles.screenHeading}>Meetings</Text>
      <FlatList
        data={allMeetings}
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
            <TouchableOpacity style={styles.closeButton} onPress={closeDetails}>
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
              When:{" "}
              <Text style={styles.value}>
                {selectedMeeting?.time} "" {selectedMeeting?.date}
              </Text>
            </Text>
            <Text style={styles.label}>
              Description:{" "}
              <Text style={styles.value}>{selectedMeeting?.description}</Text>
            </Text>
            <Text style={styles.label}>Participants:</Text>
            {selectedMeeting?.participants.map((p, index) => (
              <Text key={index} style={styles.value}>
                • {p.user?.firstname ?? "Unknown"} {p.user?.lastname ?? ""} (
                {p.user?.email ?? "No email"})
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
              style={[styles.optionButton, styles.optionButtonFilled]} // Updated style here for blue color
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
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusStarted: {
    backgroundColor: "#4CAF50", // Green for started
  },
  statusPending: {
    backgroundColor: "#FFC107", // Amber for pending
  },
  statusBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
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
    color: "black",
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
    backgroundColor: "#007AFF", // Blue button background for both options
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
