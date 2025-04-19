import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const RecordingScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00');
  const [audioFilePath, setAudioFilePath] = useState('hello.wav'); // Changed to .wav

  useEffect(() => {
    requestPermission();
    return () => {
      audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.stopPlayer();
    };
  }, []);

  const requestPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Audio Recording Permission',
        message: 'We need access to your microphone for recording.',
      }
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Microphone permission denied');
    }
  };

  const onStartRecording = async () => {
    const path = 'hello.wav'; // Use .wav for better compatibility
    const result = await audioRecorderPlayer.startRecorder(path);
    setAudioFilePath(path); // Update file path on start recording
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
      return;
    });
    setIsRecording(true);
    console.log('Recording started: ', result);
  };

  const onStopRecording = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    setIsRecording(false);
    console.log('Recording stopped: ', result);
  };

  const onStartPlaying = async () => {
    if (!audioFilePath) {
      console.log('No audio file to play!');
      return;
    }

    console.log('Starting playback for: ', audioFilePath);
    const result = await audioRecorderPlayer.startPlayer(audioFilePath);

    audioRecorderPlayer.addPlayBackListener((e) => {
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
      return;
    });

    setIsPlaying(true);
    console.log('Playback started: ', result);
  };

  const onStopPlaying = async () => {
    await audioRecorderPlayer.stopPlayer();
    setIsPlaying(false);
    console.log('Playback stopped');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Please Say</Text>
      <Text style={styles.instruction}>
        "Hello! My name is Your name"
      </Text>

      {/* Audio Waveform Placeholder */}
      <View style={styles.waveform}>
        <Text>Waveform Animation Placeholder</Text>
      </View>

      <Text style={styles.recordTime}>{recordTime}</Text>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={isRecording ? onStopRecording : onStartRecording}
        >
          <Text style={styles.controlText}>{isRecording ? '■' : '●'}</Text> {/* Stop/Start */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={onStartPlaying}
          disabled={isPlaying || isRecording} // Disable play while recording
        >
          <Text style={styles.controlText}>▶</Text> {/* Play */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={onStopPlaying}
          disabled={!isPlaying} // Disable stop while not playing
        >
          <Text style={styles.controlText}>❚❚</Text> {/* Pause */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backText: {
    fontSize: 20,
    color: '#007aff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  waveform: {
    marginBottom: 40,
    width: '80%',
    height: 80,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordTime: {
    fontSize: 18,
    marginVertical: 10,
    color: '#555',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  controlButton: {
    backgroundColor: '#007aff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    margin: 5,
  },
  controlText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RecordingScreen;
