import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileHeader from "../components/ProfileHeader"; // Import ProfileHeader component
import UserInfo from "../components/UserInfo"; // Import UserInfo component

const ProfilePage = ({ onEditPress, onLogoutPress }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.log("Failed to load user", error);
      }
    };

    loadUser();
  }, []);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <ProfileHeader
        name={user.name}
        profilePic={user.profilePic}
        onEditPress={onEditPress}
      />

      {/* User Info */}
      <UserInfo email={user.email} password={user.password} />

      {/* Logout Button */}
      <TouchableOpacity onPress={onLogoutPress} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
        {/* Data{" "} */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#ff4d4d",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfilePage;
