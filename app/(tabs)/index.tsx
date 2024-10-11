import React from 'react';
import { Text, View, ImageBackground, StyleSheet, Image } from 'react-native';
// Import the local image correctly without wrapping in an object
import bg from '../../assets/images/s1-bg.png';
import logo from '../../assets/images/s1-logo.png';

export default function HomeScreen() {
  return (
    <ImageBackground 
      source={bg}  // Directly use the imported image
      style={styles.background}  // Style for background image
      resizeMode="cover"  // Ensure the image covers the entire screen
    >
      <View style={styles.overlay}>
        {/* Logo placed at the center */}
        <Image source={logo} style={styles.logo} />
      </View>
    
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',     // Full width of the screen
    height: undefined, // Auto-adjust height to maintain aspect ratio
    aspectRatio: 1,
  },
});
