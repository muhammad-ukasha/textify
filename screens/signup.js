import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/header";
import WelcomeSection from "../components/welcomescreen";
// import ButtonGroup from '../../components/buttongroup';

const signup = () => {
  console.log()
  return (
    <View style={styles.container}>
      <Header />
      <WelcomeSection  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
});

export default signup;
