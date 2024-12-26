import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{'<'} Back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Makes it stick to the top-left
    top: 10, // Adjust for safe area or status bar
    left: 10, // Align to the left
    zIndex: 10, // Ensure it is above other content
    backgroundColor: '#fff', // Optional background for better visibility
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Adds a subtle shadow for Android
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
});

export default BackButton;
