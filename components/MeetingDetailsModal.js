import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MeetingDetailsModal = ({ route }) => {
  const { meetingDetails } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.modalTitle}>Meeting Details</Text>
      <Text>Organizer: {meetingDetails.organizer}</Text>
      <Text>Subject: {meetingDetails.subject}</Text>
      <Text>When: {meetingDetails.date}</Text>
      <Text>Description: {meetingDetails.description}</Text>
      <Text>Participants: {meetingDetails.participants.join(', ')}</Text>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#f44336',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MeetingDetailsModal;
