import { View, Image, ImageBackground, Pressable, Animated } from 'react-native';
import React, { useRef } from 'react';
import welcomeScreenBackgroundImage from "@/assets/images/s1-bg.png";
import logoImage from "@/assets/images/icon.png";
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
    const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale value of 1

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.9, // Scale down to 90%
            useNativeDriver: true, // Use native driver for better performance
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1, // Scale back to original size (100%)
            friction: 3, // Adjust bounce effect
            tension: 100,
            useNativeDriver: true,
        }).start();
        console.log('Logo pressed!');
    };

    return (
        <View className="flex-1">
            <ImageBackground
                source={welcomeScreenBackgroundImage}
                resizeMode='cover'
                className="flex-1"
            >
                <SafeAreaView className="flex-1 justify-center items-center">
                    <Pressable
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                    >
                        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                            <Image 
                                source={logoImage} 
                                className="w-[350px] h-[350px]" // Tailwind class for logo size
                                resizeMode="contain"
                            />
                        </Animated.View>
                    </Pressable>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

export default App;
