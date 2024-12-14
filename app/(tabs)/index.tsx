import React from 'react';
import { View, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signup from '../../screens/signup'
import SignupScreen from '../../screens/SignUpScreen'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    
    <View style={styles.container}>
      {/* <Signup  /> */}
      <SignupScreen />


    </View>
    
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="SignUp">
    //     <Stack.Screen 
    //       name="SignUp" 
    //       component={signup} 
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen 
    //       name='Home'
    //       component={signupScreen} 
    //       options={{ headerShown: false }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  )
  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
});

export default App;
