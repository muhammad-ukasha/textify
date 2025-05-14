import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../api/axiosInstance";

// const API_URL = "https://your-backend.com/api/schedule-meeting"; // Replace with your actual endpoint

const ScheduleMeetingScreen = () => {
  const navigation = useNavigation();

  const [organizer, setOrganizer] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [meetingSubject, setMeetingSubject] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [participants, setParticipants] = useState([]);
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load organizer from local storage
  useEffect(() => {
    const fetchOrganizer = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("userData");
        if (storedUser) {
          
          const user = JSON.parse(storedUser);
          let name = (user.firstName + " " + user.lastName )
          setOrganizer(user.email || "Unknown User");
        }
      } catch (error) {
        console.error("Failed to load user from storage", error);
      }
    };
    fetchOrganizer();
  }, []);

  const generateMeetingId = () => {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 10))
      .join("")
      .replace(/(\d{3})(?=\d)/g, "$1 ");
  };

  const onChangeDate = (_, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeTime = (_, selectedTime) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) setDate(selectedTime);
  };

  const openAddModal = () => setIsAddModalVisible(true);
  const closeAddModal = () => setIsAddModalVisible(false);

  const handleAddParticipant = () => {
    if (participantName.trim() && participantEmail.trim()) {
      setParticipants((prev) => [
        ...prev,
        { name: participantName.trim(), email: participantEmail.trim() },
      ]);
      setParticipantName("");
      setParticipantEmail("");
    }
  };

  const handleSchedule = async () => {
    if (
      !meetingName ||
      !meetingSubject ||
      !description ||
      participants.length === 0
    ) {
      setErrorMessage("Fill all fields & add participants.");
      return;
    }

    const payload = {
      title: meetingName,
      date: date.toDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      meetingId: generateMeetingId(),
      organizer,
      subject: meetingSubject,
      description,
      participants,
    };

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await axiosInstance.post("/addmeeting", payload);
      if (response.status === 200 || response.status === 201) {
        Alert.alert("Success", "Meeting Scheduled Successfully!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        setErrorMessage("Unexpected server response.");
      }
    } catch (err) {
      console.error("Error scheduling meeting:", err);
      if (err.response) {
        setErrorMessage(err.response.data.message || "Server error occurred.");
      } else {
        setErrorMessage("Failed to connect to server.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Meeting App</Text>
      <Text style={styles.subheader}>Schedule a meeting</Text>
      <Text style={styles.small}>Enter your meeting details.</Text>

      <ScrollView contentContainerStyle={styles.form}>
        <TextInput
          placeholder="Meeting Name"
          style={styles.input}
          value={meetingName}
          onChangeText={setMeetingName}
        />
        <TextInput
          style={styles.input}
          placeholder="Meeting Subject"
          value={meetingSubject}
          onChangeText={setMeetingSubject}
        />
      
        <Text style={styles.label}>When</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text>
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
            {showTimePicker && (
              <DateTimePicker
                value={date}
                mode="time"
                display="center"
                onChange={onChangeTime}
              />
            )}
        </View>

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Description"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <View style={styles.partContainer}>
          <Text style={styles.label}>Participants</Text>
          <TouchableOpacity style={styles.addIcon} onPress={openAddModal}>
            <Text style={styles.addIconText}>＋</Text>
          </TouchableOpacity>
        </View>

        {errorMessage ? (
          <Text style={{ color: "red", marginBottom: 10, textAlign: "center" }}>
            {errorMessage}
          </Text>
        ) : null}

        <TouchableOpacity
          style={[
            styles.scheduleBtn,
            isSubmitting && { backgroundColor: "#aaa" },
          ]}
          onPress={handleSchedule}
          disabled={isSubmitting}
        >
          <Text style={styles.scheduleBtnText}>
            {isSubmitting ? "Scheduling..." : "Schedule"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* {showDatePicker && (
        <DateTimePicker value={date} mode="date" display="default" onChange={onChangeDate} />
      )}
      {showTimePicker && (
        <DateTimePicker value={date} mode="time" display="default" onChange={onChangeTime} />
      )} */}

      {/* Modal to Add Participants */}
      <Modal
        isVisible={isAddModalVisible}
        onBackdropPress={closeAddModal}
        style={styles.bottomModal}
        swipeDirection="down"
        onSwipeComplete={closeAddModal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Participant</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={participantName}
            onChangeText={setParticipantName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={participantEmail}
            onChangeText={setParticipantEmail}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={handleAddParticipant}
            >
              <Text style={styles.modalBtnText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtn} onPress={closeAddModal}>
              <Text style={styles.modalBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.partList}>
            {participants.map((p, i) => (
              <Text key={i} style={styles.partItem}>
                • {p.name} ({p.email})
              </Text>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

// Add your existing styles here or reuse the previous style object.
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  back: { padding: 16 },
  backText: { fontSize: 18, color: "#007AFF" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007AFF",
  },
  subheader: { fontSize: 18, textAlign: "center", marginTop: 8 },
  small: { fontSize: 14, textAlign: "center", color: "#555", marginBottom: 20 },
  form: { paddingHorizontal: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    color: "gray"
  },
  label: { fontWeight: "600", marginBottom: 8 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  pickerButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginHorizontal: 5,
  },
  partContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  addIcon: {
    marginLeft: 12,
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 6,
  },
  addIconText: { color: "#fff", fontSize: 18 },

  scheduleBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 40,
  },
  scheduleBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  bottomModal: { justifyContent: "flex-end", margin: 0 },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  modalBtn: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 6,
    marginHorizontal: 5,
    alignItems: "center",
  },
  modalBtnFilled: { backgroundColor: "#007AFF" },
  modalBtnText: { color: "#fff", fontWeight: "600" },
  partList: { marginTop: 10 },
  partItem: { fontSize: 16, marginVertical: 4 },
});
export default ScheduleMeetingScreen;
