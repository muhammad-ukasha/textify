import React from "react";
import { View, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signup from "../../screens/signup";
import SignupScreen from "../../screens/SignUpScreen";
import SignInScreen from "@/screens/signInScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    //   <View style={styles.container}>
    //  <SignInScreen/>
    //   </View>
<>
    <Stack.Navigator initialRouteName="welcom">
      <Stack.Screen
        name="welcom"
        component={Signup}
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
    </Stack.Navigator>
    </>
    
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
