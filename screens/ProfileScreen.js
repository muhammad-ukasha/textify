import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileImage from '../components/ProfileImage'; // Import ProfileImage component
import EditProfileForm from '../components/EditProfileForm'; // Import EditProfileForm component
import BackButton from '../components/backbutton';  // Import BackButton component

const EditProfilePage = ({ user, onBackPress, onSaveChanges }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <BackButton onPress={onBackPress} />

      {/* Title */}
      <Text style={styles.title}>Edit Profile</Text>

      {/* Profile Image */}
      <ProfileImage imageUrl={user.profilePic} onChangePicture={() => { /* Handle picture change */ }} />

      {/* Edit Profile Form */}
      <EditProfileForm user={user} onSaveChanges={onSaveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
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

export default EditProfilePage;
