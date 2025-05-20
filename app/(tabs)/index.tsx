import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";


// Import screens
import Signup from "../../screens/signup";
import SignupScreen from "../../screens/SignUpScreen";
import SignInScreen from "@/screens/signInScreen";
import MeetingScreen from "../../screens/meetingScreen";
import otpScreen from "../../screens/otpScreen";
import signup from "../../screens/signup";
import ForgetPasswordScreen from "../../screens/forgetPasswordScreen ";
import MainMeetingScreen from "../../screens/MainMeetingScreen";
import TranscriptPage from "../../screens/TranscriptPage";
import MeetingTabs from "../../screens/MeetingTabs";
import DemoAudioScreen from "../../screens/demoScreen";
import RecordingScreen from "../../screens/RecordingScreen";
import InstantMeetingScreen from "../../screens/InstantMeetingScreen"; // Import InstantMeetingScreen
import ScheduleMeetingScreen from "../../screens/ScheduleMeetingScreen";
import JoinMeetingScreen from "../../screens/JoinMeetingScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator initialRouteName="welcom">
      <Stack.Screen
        name="welcom"
        component={signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signin"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="otpScreen"
        component={otpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgetPasswordScreen"
        component={ForgetPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="meetingScreen"
        component={MeetingTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainMeetingScreen"
        component={MainMeetingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TranscriptPage"
        component={TranscriptPage}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="DemoAudioScreen"
        component={DemoAudioScreen}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        name="RecordingScreen"
        component={RecordingScreen}
        options={{ headerShown: false }}
      /> */}
      {/* Add InstantMeetingScreen here */}
      {/* <Stack.Screen
        name="InstantMeetingScreen"
        component={InstantMeetingScreen}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        name="ScheduleMeetingScreen"
        component={ScheduleMeetingScreen}
        options={{ headerShown: false }} // Added the closing tag for ScheduleMeetingScreen
      /> */}
      {/* <Stack.Screen
        name="JoinMeetingScreen"
        component={JoinMeetingScreen}
        options={{ headerShown: false }}
      /> */}

    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
});

export default App;
