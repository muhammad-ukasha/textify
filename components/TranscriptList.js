import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import TranscriptItem from './TranscriptItem';

const TranscriptList = ({ data }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((entry, index) => (
        <TranscriptItem
          key={index}
          time={entry.time}
          speaker={entry.speaker}
          text={entry.text}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20, // Ensures content is not cut off at the bottom
    paddingHorizontal: 20,
  },
});

export default TranscriptList;
