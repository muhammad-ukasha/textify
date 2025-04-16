import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TranscriptItem = ({ time, speaker, text }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.timeText}>{time}</Text>
      <Text style={styles.speakerText}>{speaker}: </Text>
      <Text style={styles.transcriptionText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  timeText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  speakerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  transcriptionText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
});

export default TranscriptItem;
