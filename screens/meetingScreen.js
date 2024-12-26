import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const MeetingScreen = () => {
  // Example meeting data
  const meetings = [
    {
      id: '1',
      date: 'Mon, Jan 12 - 2025',
      time: '01:30 PM - 02:30 PM',
      title: 'Product Launch',
      meetingId: '715 3281 0157',
      status: 'Scheduled',
    },
    {
      id: '2',
      date: 'Wed, Dec 25 - 2025',
      time: '08:30 AM - 09:00 AM',
      title: 'Product Update 1.0',
      meetingId: '715 3281 0158',
      status: 'Scheduled',
    },
    {
      id: '3',
      date: 'Fri, Oct 25 - 2024',
      time: '08:30 AM - 09:00 AM',
      title: 'Product Update',
      meetingId: '715 3281 0158',
      status: 'Ended',
    },
  ];

  const renderMeeting = (meeting) => (
    <View key={meeting.id} style={styles.meetingCard}>
      {/* Meeting Header */}
      <View style={styles.header}>
        <Text style={styles.dateText}>{meeting.date}</Text>
        <View
          style={[
            styles.statusBadge,
            meeting.status === 'Scheduled'
              ? styles.scheduledBadge
              : styles.endedBadge,
          ]}
        >
          <Text style={styles.statusText}>{meeting.status}</Text>
        </View>
      </View>

      {/* Meeting Details */}
      <Text style={styles.timeText}>{meeting.time}</Text>
      <Text style={styles.titleText}>{meeting.title}</Text>
      <Text style={styles.meetingIdText}>Meeting ID: {meeting.meetingId}</Text>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.buttonText}>Show Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dismissButton}>
          <Text style={styles.dismissButtonText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>All Meetings</Text>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {meetings.map(renderMeeting)}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Profile</Text>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 20,
    marginLeft: 20,
  },
  scrollContent: {
    paddingBottom: 100, // To account for bottom navigation
  },
  meetingCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    marginHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  scheduledBadge: {
    backgroundColor: '#007bff',
  },
  endedBadge: {
    backgroundColor: '#dc3545',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  meetingIdText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  joinButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  detailsButton: {
    backgroundColor: '#17a2b8',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dismissButton: {
    backgroundColor: '#dc3545',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dismissButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 14,
    color: '#666',
  },
  activeNavText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default MeetingScreen;
