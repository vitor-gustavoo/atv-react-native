
/*
// HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ onPressStart }) => {
  const handleStart = () => {
    if (onPressStart) {
      onPressStart();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('./images/logo.png')} style={styles.image} />
      </View>
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Começar</Text>
        <AntDesign name="arrowright" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: '80%',
    height: undefined, 
    aspectRatio: 1,
  },
  startButton: {
    flexDirection: 'row',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    marginRight: 10,
  },
});

export default HomeScreen;
*/