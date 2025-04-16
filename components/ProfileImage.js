import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileImage = ({ imageUrl, onChangePicture }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.profileImage} />
      <TouchableOpacity onPress={onChangePicture} style={styles.changeImageButton}>
        <Text style={styles.changeImageText}>Change Picture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changeImageButton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  changeImageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProfileImage;
