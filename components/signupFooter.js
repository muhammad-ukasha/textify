import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Footer = ({title , link , onPress}) => {
  return (
    <TouchableOpacity >
      <Text style={styles.text}>
        {title} <Text style={styles.link} onPress={onPress} >{link}</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#666',
  },
  link: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default Footer;
