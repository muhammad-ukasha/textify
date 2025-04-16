import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TranscriptionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Heading */}
      <Text style={styles.heading}>Transcription</Text>

      {/* Scrollable Transcript */}
      <ScrollView style={styles.scrollBox}>
        <Text style={styles.transcriptionText}>
          [00:00] Steve: Welcome back, Brad. This is the second part of our interview, and I want to get through these as quickly as possible because I know you have somewhere to be, so —
          {"\n\n"}[00:05] Brad: Thank you. It's my pleasure.
          {"\n\n"}[00:07] Steve: I saw on the website you worked doing graphic design for a local branding agency before branching out and starting your own business. Was — was that—
          {"\n\n"}[00:13] Brad: Yes.
          {"\n\n"}[00:15] Steve: So was that a conscious choice, or ...?
          {"\n\n"}[00:17] Brad: Yes. Well, ah—
          {"\n\n"}[00:17] Steve: Sorry, uh, one sec. Can you, um ... We can hear the fan.
          {"\n\n"}[00:20] Charlene: [inaudible 00:21]
          {"\n\n"}[00:21] Steve: N-no, no, that's perfect. Thanks, Charlene. Good.
          {"\n\n"}[00:23] So, was starting your own company intentional, or did you just sort of fall into it?
          {"\n\n"}[00:26] Brad: Actually, sort of both. I actually started out doing it as a favor to a friend. He ... I didn’t really know what I was doing at the time. He had a need — some small ad stuff — and I kind of said sure, which turned into another thing, then another thing for local businesses and then local events. So I got kind of took off from there and then I figured, well, if I'm going to be doing all this anyway, might as well turn it into a real thing, you know, and like, make it something out of this, you know?
          {"\n\n"}[00:38] Steve: Sure. Sure. So what kind of challenges did you expect when you were starting off, that you weren’t expecting?
          {"\n\n"}[00:41] Brad: Hmm, challenges I wasn’t expecting, uh...
          {"\n\n"}[00:42] Steve: [laughs] I keep putting you on the spot. I don’t think I put that one in the questions either. We’re ... we’re just ad-libbing here.
          {"\n\n"}[00:51] Brad: No, no, it’s fine. So, um, challenges ...
          {"\n\n"}[01:13] Steve: Yeah. It could be, like, funding, or anything. So I—
        </Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  scrollBox: {
    backgroundColor: '#eaf6ff',
    borderRadius: 10,
    padding: 15,
    maxHeight: '90%',
  },
  transcriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
});

export default TranscriptionScreen;
