import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import welcomeScreenBackgroundImage from "@/assets/images/s1-bg.png";
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
    return (
        <View className="flex-1">
            <ImageBackground
                source={welcomeScreenBackgroundImage}
                resizeMethod='cover'
                className="flex-1"
            >
                <SafeAreaView>
                    <Text className="text-center text-white font-bold text-4xl">Hello</Text>
                </SafeAreaView>
            </ImageBackground>
        </View>
    )
}

export default App