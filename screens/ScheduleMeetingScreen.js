import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

const ScheduleMeetingScreen = () => {
  const navigation = useNavigation();

  const [meetingName, setMeetingName] = useState("");
  const [meetingSubject, setMeetingSubject] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [participants, setParticipants] = useState([]);
  const [participantEmail, setParticipantEmail] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

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
    if (participantEmail.trim()) {
      setParticipants((ps) => [...ps, participantEmail.trim()]);
      setParticipantEmail("");
    }
  };

  const handleSchedule = () => {
    // your scheduling logic here...
    console.log({
      meetingName,
      meetingSubject,
      description,
      date,
      participants,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Meeting App</Text>
      <Text style={styles.subheader}>Schedule a meeting</Text>
      <Text style={styles.small}>Enter your meeting details.</Text>

      <ScrollView contentContainerStyle={styles.form}>
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

        <TouchableOpacity style={styles.scheduleBtn} onPress={handleSchedule}>
          <Text style={styles.scheduleBtnText}>Schedule</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* -- Date & Time Pickers -- */}
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
          display="default"
          onChange={onChangeTime}
        />
      )}

      {/* -- Bottom Sheet Modal to Add Participants -- */}
      <Modal
        isVisible={isAddModalVisible}
        onBackdropPress={closeAddModal}
        style={styles.bottomModal}
        swipeDirection="down"
        onSwipeComplete={closeAddModal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Participants</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter participant's email address"
            value={participantEmail}
            onChangeText={setParticipantEmail}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalBtn, styles.modalBtnFilled]}
              onPress={handleAddParticipant}
            >
              <Text style={styles.modalBtnText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalBtn, styles.modalBtnFilled]}
              onPress={closeAddModal}
            >
              <Text style={styles.modalBtnText}>Confirm</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.partList}>
            {participants.map((p, i) => (
              <Text key={i} style={styles.partItem}>
                • {p}
              </Text>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  back: { padding: 16 },
  backText: { fontSize: 18, color: "#007AFF" },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#007AFF" },
  subheader: { fontSize: 18, textAlign: "center", marginTop: 8 },
  small: { fontSize: 14, textAlign: "center", color: "#555", marginBottom: 20 },
  form: { paddingHorizontal: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  label: { fontWeight: "600", marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  pickerButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginHorizontal: 5,
  },
  partContainer: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
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
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginVertical: 12 },
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
