import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";

const MeetingSummaryScreen = ({ route }) => {
  const { summaryText, meetingId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Meeting Summary</Text>
      <ScrollView style={styles.summaryContainer}>
        <Text style={styles.summaryText}>{summaryText}</Text>
      </ScrollView>
    </View>
  );
};

export default MeetingSummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  summaryContainer: {
    backgroundColor: "#f0f8ff",
    padding: 15,
    borderRadius: 10,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#333",
  },
});
