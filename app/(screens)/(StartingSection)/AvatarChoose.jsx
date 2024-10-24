import { View, ImageBackground, StatusBar, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import welcomeScreenBackgroundImage from "@/assets/images/s1-bg.png";
import * as NavigationBar from 'expo-navigation-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const avatars = [
    require("@/assets/images/AvatarChoose/poki.png"),
    require('@/assets/images/AvatarChoose/joe.png'),
    require('@/assets/images/AvatarChoose/moki.png'),
];

const AvatarChoose = () => {
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[1]); 
    const navigation = useNavigation(); // For navigating to the next screen

    useEffect(() => {
        NavigationBar.setVisibilityAsync('hidden');
        return () => {
            NavigationBar.setVisibilityAsync('visible');
        };
    }, []);

    const handleChoose = async () => {
        if (selectedAvatar) {
            try {
                // Save the selected avatar to local storage
                await AsyncStorage.setItem('selectedAvatar', JSON.stringify(selectedAvatar));
                // Alert.alert("Success", "Avatar chosen successfully!");
                router.push("/PersonalInformation");
            } catch (error) {
                Alert.alert("Error", "Failed to save avatar.");
            }
        } else {
            Alert.alert("Warning", "Please select an avatar.");
        }
    };

    const router = useRouter();

    return (
        <View className="flex-1">
            <StatusBar hidden={true} />
            <ImageBackground
                source={welcomeScreenBackgroundImage}
                resizeMode='cover'
                className="flex-1 justify-start items-center"
            >
                <View className="mt-2">
                    <Image
                        source={require('@/assets/images/AvatarChoose/choose-your-avatar-text.png')}
                        className="w-[480px] h-24"
                        resizeMode="contain"
                    />
                </View>
                <View className="flex-row space-x-7 mb-[90px]">
                    {avatars.map((avatar, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedAvatar(avatar)}
                            className={`rounded-lg overflow-hidden ${selectedAvatar === avatar ? 'scale-[1.2]' : ''}`}
                        >
                            <Image
                                source={avatar}
                                className="w-[110px] h-[170px] rounded-lg"
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity onPress={handleChoose}>
                    <Image
                        source={require('@/assets/images/AvatarChoose/choose.png')}
                        className="w-52 h-28 z-0 self-center absolute bottom-0"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

export default AvatarChoose;
