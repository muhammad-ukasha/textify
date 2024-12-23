import React from 'react';
import { Text, StyleSheet } from 'react-native';

const SubHeader = ({ title, style }) => {
  return <Text style={[styles.headerText, style]}>{title}</Text>;
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
  },
});

export default SubHeader;
