import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ParticipantTile = ({ name, role }) => {
  return (
    <View style={styles.tile}>
      <Text style={styles.nameText}>
        {name}
        {role ? ` (${role})` : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    height: 120,
    backgroundColor: '#ddd',
    borderRadius: 15,
    marginBottom: 15,
    justifyContent: 'flex-end',
    padding: 10,
  },
  nameText: {
    fontSize: 16,
    color: '#000',
  },
});

export default ParticipantTile;
