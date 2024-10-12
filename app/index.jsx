import { View, Image, ImageBackground, Pressable, Animated, StatusBar } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { useRouter } from 'expo-router'; // Assuming you're using expo-router
import welcomeScreenBackgroundImage from "@/assets/images/s1-bg.png";
import logoImage from "@/assets/images/icon.png";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';

const App = () => {
    const router = useRouter(); // Router hook for navigation
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Hide the bottom navigation bar
        NavigationBar.setVisibilityAsync('hidden');

        // Cleanup function to reset the visibility when the component unmounts
        return () => {
            NavigationBar.setVisibilityAsync('visible');
        };
    }, []);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 100,
            useNativeDriver: true,
        }).start(() => {
            // Navigate to the AvatarChoose route after animation completes
            router.push("/AvatarChoose");
        });
        console.log('Logo pressed!');
    };

    return (
        <View className="flex-1">
            {/* Hide the status bar for full-screen effect */}
            <StatusBar hidden={true} />
            <ImageBackground
                source={welcomeScreenBackgroundImage}
                resizeMode='cover' // Cover the entire screen
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
                                className="w-[350px] h-[350px]"
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
