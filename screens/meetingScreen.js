import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Meeting Card Component
const MeetingCard = ({ time, title, meetingId, onTranscription, onSummary, onDelete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.meetingTime}>{time}</Text>
      <Text style={styles.meetingTitle}>{title}</Text>
      <Text style={styles.meetingId}>Meeting ID: {meetingId}</Text>
      <View style={styles.cardButtons}>
        <TouchableOpacity style={styles.transcriptionButton} onPress={onTranscription}>
          <Text style={styles.buttonText}>join</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.summaryButton} onPress={onSummary}>
          <Text style={styles.buttonText}>dismiss</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main Meeting Screen
const MeetingScreen = () => {
  const meetingData = [
    {
      id: '1',
      date: 'Mon, Oct 23, 2024',
      time: '01:30 PM - 02:30 PM',
      title: 'Product Launch',
      meetingId: '715 3281 0157',
    },
    {
      id: '2',
      date: 'Wed, Oct 25, 2024',
      time: '08:30 AM - 09:00 AM',
      title: 'Product Update 1.0',
      meetingId: '715 3281 0158',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.dateSection}>
      <Text style={styles.dateText}>{item.date}</Text>
      <MeetingCard
        time={item.time}
        title={item.title}
        meetingId={item.meetingId}
        onTranscription={() => alert('Transcription Clicked')}
        onSummary={() => alert('Summary Clicked')}
        onDelete={() => alert('Meeting Deleted')}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meeting App</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.startMeetingButton}>
            <Text style={styles.buttonText}>Start Meeting</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.joinMeetingButton}>
            <Text style={styles.buttonText1 } >Join a meeting</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Meeting List */}
      <FlatList
        data={meetingData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="search" size={28} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="home" size={28} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person" size={28} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#e6f7ff',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  startMeetingButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  joinMeetingButton: {
    backgroundColor: '#fff',
    borderColor: '#007bff',
    color: 'blue',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonText1: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  dateSection: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  meetingTime: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#007bff',
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  meetingId: {
    color: '#666',
    marginVertical: 5,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  transcriptionButton: {
    backgroundColor: '#009dff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  summaryButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
});

export default MeetingScreen;
