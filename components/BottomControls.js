import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const BottomControls = () => {

  const transcription = ()=>{
    console.log('Transcription button pressed');
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="information-circle-outline" size={26} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={transcription}>
        <MaterialIcons name="content-copy" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="videocam" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="mic" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.endCallButton}>
        <Ionicons name="call" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  endCallButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 25,
  },
});

export default BottomControls;
