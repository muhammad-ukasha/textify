import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Modal } from 'react-native';

const Loader = ({ visible = false, message = 'Loading...' }) => {
  if (!visible) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent
    >
      <View style={styles.container}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
});

export default Loader;
