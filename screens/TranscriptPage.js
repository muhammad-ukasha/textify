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

import BackButton from "../components/backbutton";
import { Ionicons } from "@expo/vector-icons";

const API_URL = "https://afb3-43-246-222-105.ngrok-free.app";
const POLL_INTERVAL = 30000;

const TranscriptScreen = () => {
  const navigation = useNavigation();
  const [transcripts, setTranscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchTranscripts = async () => {
    try {
      console.log("Fetching transcripts list...");
      const listResponse = await fetch(`${API_URL}/list-transcripts`);
  
      if (!listResponse.ok) {
        throw new Error(`HTTP error! status: ${listResponse.status}`);
      }
  
      // Check if the response is JSON
      const contentType = listResponse.headers.get("content-type");
      console.log(contentType)
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Expected JSON, but got: ${contentType}`);
      }
  
      const listData = await listResponse.json();
      console.log("List response:", listData);
  
      if (listData.status === "success" && listData.transcripts) {
        // Sort transcripts by last_modified, newest first
        const sortedTranscripts = listData.transcripts.sort(
          (a, b) => new Date(b.last_modified) - new Date(a.last_modified)
        );
  
        // Fetch content for each transcript
        const transcriptsWithContent = await Promise.all(
          sortedTranscripts.map(async (t) => {
            try {
              console.log("Fetching transcript:", t.key);
              // Use the exact URL provided by the server
              const response = await fetch(`${API_URL}${t.exact_url}`);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
  
              // Check if the transcript response is JSON
              const transcriptContentType = response.headers.get("content-type");
              if (!transcriptContentType || !transcriptContentType.includes("application/json")) {
                throw new Error(`Expected JSON, but got: ${transcriptContentType}`);
              }
  
              const data = await response.json();
              console.log("Transcript response:", data);
              return {
                ...t,
                content: data.transcript || "audio file is too short",
                error: null,
              };
            } catch (err) {
              console.error(`Error fetching transcript ${t.key}:`, err);
              return {
                ...t,
                content: "Error loading content",
                error: err.message,
              };
            }
          })
        );
  
        console.log("Transcripts with content:", transcriptsWithContent);
        setTranscripts(transcriptsWithContent);
        setLastUpdated(new Date());
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching transcripts:", err);
      if (!navigator.onLine) {
        setError("No internet connection. Please check your network.");
      } else if (err.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else {
        setError(`Failed to fetch transcripts: ${err.message}`);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  

  // Initial fetch when component mounts
  useEffect(() => {
    fetchTranscripts();

    // Set up polling
    const pollInterval = setInterval(fetchTranscripts, POLL_INTERVAL);

    // Cleanup interval when component unmounts
    return () => clearInterval(pollInterval);
  }, []);

  // Handle manual refresh
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
      <Text style={styles.headerText}>Transcripts</Text>

      {/* Content */}
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
              <View key={transcript.key} style={styles.transcriptContainer}>
                <View style={styles.headerContainer}>
                  <Text style={styles.transcriptTitle}>
                    Transcript {transcripts.length - index}
                  </Text>
                  <Text style={styles.timestampText}>
                    Created:{" "}
                    {new Date(transcript.last_modified).toLocaleString()}
                  </Text>
                </View>
                {transcript.error ? (
                  <Text style={styles.errorText}>{transcript.error}</Text>
                ) : (
                  <Text style={styles.contentText}>{transcript.content}</Text>
                )}
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
    backgroundColor: "#fff",
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  transcriptContainer: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerContainer: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 8,
  },
  transcriptTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  timestampText: {
    fontSize: 12,
    color: "#666",
  },
  lastCheckedText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginBottom: 16,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
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
});

export default TranscriptScreen;
