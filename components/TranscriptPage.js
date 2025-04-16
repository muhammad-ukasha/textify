import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from './BackButton';  // The back button component
import TranscriptList from './TranscriptList';  // The list of transcriptions

// Example transcription data
const transcriptionData = [
  { time: '00:00:01', speaker: 'Jeff', text: 'Hello Everyone!' },
  { time: '00:00:10', speaker: 'Anthony', text: 'The birch canoe slid on the smooth planks.' },
  { time: '00:00:15', speaker: 'John', text: 'It is easy to tell the depths of a well.' },
  { time: '00:00:25', speaker: 'Elsa', text: 'The box was shown beside the pink truck.' },
  { time: '00:00:35', speaker: 'Areeb', text: 'The brown fox jumped over the lazy dog.' },
  // Add more transcription data as required
];

const TranscriptPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <BackButton onPress={() => navigation.goBack()} />

      {/* Title */}
      <Text style={styles.title}>Transcription</Text>

      {/* Transcript List */}
      <TranscriptList data={transcriptionData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,  // Adjust for the status bar space
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: 20,
    marginBottom: 15,
  },
});

export default TranscriptPage;
