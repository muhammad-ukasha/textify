import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MeetingScreen = () => {
  const [showInfo, setShowInfo] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Product Launch</Text>

      {/* Participant Boxes */}
      <ScrollView contentContainerStyle={styles.boxContainer}>
        <View style={styles.participantBox}>
          <Text>Exodus (Host)</Text>
        </View>
        <View style={styles.participantBox}>
          <Text>Areeb</Text>
        </View>
        <View style={styles.participantBox}>
          <Text>Asim</Text>
        </View>
        <View style={styles.participantBox}>
          <Text>Anas (You)</Text>
        </View>
      </ScrollView>

      {/* Bottom Toolbar */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
          <Ionicons name="information-circle" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("TranscriptPage")}>
          <Ionicons name="copy" size={28} color="black" />
        </TouchableOpacity>
        <Ionicons name="document-text" size={28} color="black" />
        <Ionicons name="mic" size={28} color="black" />
        <TouchableOpacity onPress={()=>{navigation.navigate("meetingScreen")}}>
          <Ionicons name="call" size={28} color="red" />
        </TouchableOpacity>
      </View>

      {/* Info Box */}
      {showInfo && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            This is a Product Launch meeting. Exodus is the host. You are
            currently viewing the participant list.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  boxContainer: {
    paddingBottom: 100,
  },
  participantBox: {
    height: 80,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  infoBox: {
    position: "absolute",
    bottom: 90,
    left: 20,
    right: 20,
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    zIndex: 10,
  },
  infoText: {
    fontSize: 15,
    color: "#333",
  },
});

export default MeetingScreen;
