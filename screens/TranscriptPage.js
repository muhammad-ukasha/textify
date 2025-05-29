import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const API_URL = "https://fe0634b5-b9ef-4605-8312-3d014ea3ce6a-00-2i7vpu8mwwwpu.sisko.replit.dev";
const POLL_INTERVAL = 30000;
import { useRoute } from "@react-navigation/native";

const TranscriptScreen = () => {
  const route = useRoute();

  const { meeting } = route.params;
  const id = meeting.meetingId;
  const navigation = useNavigation();
  const [transcripts, setTranscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  function getStartTime(timeRange) {
    if (!timeRange) return "";
    return timeRange.split("-")[0]; // "05:31:01" from "05:31:01-05:31:02"
  }
  const fetchTranscripts = async () => {
    try {
      const listResponse = await axios.get(
        `${API_URL}/list-transcripts?meeting_id=${id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const listData = listResponse.data;
      console.log("listData", listData);
      if (listData.status === "success" && listData.transcripts) {
        const sortedTranscripts = listData.transcripts.sort(
          (a, b) => new Date(b.last_modified) - new Date(a.last_modified)
        );

        const transcriptsWithContent = await Promise.all(
          sortedTranscripts.map(async (t) => {
            try {
              const response = await axios.get(
                `${API_URL}/get-transcripts/${t.key}`,
                {
                  headers: {
                    Accept: "application/json",
                  },
                }
              );

              const data = response.data;
              console.log("get", data);

              // Handle structured array or fallback to split string
              // let content = [];

              let content = Array.isArray(data) ? data : [];

              return {
                key: t.key,
                content: content,
                error: null,
              };
            } catch (err) {
              // Handle error if the transcript cannot be loaded
              console.error("Error fetching content:", err);
              return {
                key: t.key,
                content: ["Error loading content"],
                error: err.message,
              };
            }
          })
        );

        setTranscripts(transcriptsWithContent);
        console.log("transcripts", transcripts);
        setLastUpdated(new Date());
        setError(null);
      } else {
        setError("Unexpected response format from the server.");
      }
    } catch (err) {
      // Improved error handling to identify specific issues
      if (err.message.includes("Network Error")) {
        setError("Network error: Please check your internet connection.");
      } else if (err.response) {
        // Server-side error (e.g., 404 or 500)
        setError(`Server error: ${err.response.status}`);
      } else if (err.request) {
        // Request was made but no response was received
        setError("No response received from server.");
      } else {
        // General error
        setError(`Failed to fetch transcripts: ${err.message}`);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTranscripts();
    const pollInterval = setInterval(fetchTranscripts, POLL_INTERVAL);
    return () => clearInterval(pollInterval);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchTranscripts();
  }, []);

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading transcripts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.headerText}>Transcription</Text>

      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.errorSubText}>Pull down to try again</Text>
          </View>
        ) : transcripts.length > 0 ? (
          <>
            {lastUpdated && (
              <Text style={styles.lastCheckedText}>
                Last checked: {lastUpdated.toLocaleTimeString()}
              </Text>
            )}
            {transcripts.map((transcript, index) => (
              <View
                key={transcript.key || index}
                style={styles.transcriptContainer}
              >
                {transcript.content.map((line, idx) => {
                  // Ensure line.time exists, else fallback to a default or empty string
                  const timeStamp = line.time_range
                    ? line.time_range
                    : "";

                  return (
                    <Text key={idx} style={styles.contentText}>
                      {timeStamp && `[${timeStamp}] `}
                      {line.speaker ? `${line.speaker}: ` : ""}
                      {typeof line === "string" ? line : line.text}
                    </Text>
                  );
                })}
              </View>
            ))}
          </>
        ) : (
          <Text style={styles.noDataText}>No transcripts available</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginBottom: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  transcriptContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
    color: "#333",
  },
  loadingText: {
    marginTop: 8,
    color: "#666",
  },
  errorContainer: {
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 8,
  },
  errorSubText: {
    color: "#666",
    fontSize: 12,
  },
  noDataText: {
    textAlign: "center",
    color: "#666",
    marginTop: 16,
  },
  lastCheckedText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginBottom: 16,
  },
});

export default TranscriptScreen;
