import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MeetingInfo = ({ code }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meeting Info</Text>
      <View style={styles.codeContainer}>
        <Text style={styles.meetingCode}>{code}</Text>
        <TouchableOpacity style={styles.copyButton}>
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>
        Share this meeting code with others you want to join the meeting.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  meetingCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  copyButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  copyText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default MeetingInfo;
