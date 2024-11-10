import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ImageBackground, Pressable, Animated, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from 'expo-navigation-bar';
import welcomeScreenBackgroundImage from "@/assets/images/s1-bg.png";
import Profile from "@/assets/images/Icons/profile.png";
import Settings from "@/assets/images/Icons/settings.png";
import Location from "@/assets/images/Icons/location.png";
import BackArrow from "@/assets/images/Icons/back-arrow.png";
import HamMenu from "@/assets/images/Icons/hamburger-menu.png";
import GroupPeople from "@/assets/images/Icons/group-of-people.png";
import Calendar from "@/assets/images/Icons/calendar.png";
import Qmark from "@/assets/images/Icons/question-mark.png";
import CountBoard from "@/assets/images/Dashboard/coin-board.png";
import Research from "@/assets/images/Dashboard/research.png";
import avatar4Image from "@/assets/images/Characters/poki.png";
import avatar5Image from "@/assets/images/Characters/joe.png";
import avatar6Image from "@/assets/images/Characters/moki.png";


const PedosphereGameEnd = () => {
    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [coins, setCoins] = useState(0);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const scaleFunLearnAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const loadData = async () => {
            const storedAvatar = await AsyncStorage.getItem('selectedAvatar');
            const storedName = await AsyncStorage.getItem('userName');
            const storedCountry = await AsyncStorage.getItem('userCountry');
            const storedCoins = await AsyncStorage.getItem('userCoins');

        };
        loadData();
    }, []);

    useEffect(() => {
        NavigationBar.setVisibilityAsync('hidden');
        return () => {
            NavigationBar.setVisibilityAsync('visible');
        };
    }, []);


    return (
        <View className="flex-1">
            <StatusBar hidden={true} />
            <ImageBackground
                source={welcomeScreenBackgroundImage}
                resizeMode='cover'
                className="flex-1 justify-start items-center"
            >
                {/* Top Left Corner */}
                <View className="absolute top-3 left-3">
                    <View className="flex-row gap-3">
                        <Image source={Profile} className="w-12 h-12" />
                        <Image source={CountBoard} className=" h-12" />
                    </View>
                    <View>
                        <Image source={Settings} className="w-12 h-12" />
                    </View>
                </View>

                {/* Top Right Corner */}
                <View className="absolute top-3 right-3">
                    <View className="flex-row gap-2">
                        <Image source={Research} className="h-12" />
                        <Image source={Calendar} className="w-12 h-12" />
                        <Image source={GroupPeople} className="w-12 h-12" />
                        <Image source={HamMenu} className="w-12 h-12" />
                    </View>
                </View>

                {/* Bottom Left Corner */}
                <View className="absolute bottom-3 left-3">
                    <Image source={Location} className="w-12 h-12" />
                    <Image source={BackArrow} className="w-12 h-12" />
                </View>

                {/* Bottom Right Corner */}
                <View className="absolute bottom-2 right-3">
                    <Image source={Qmark} className="w-12 h-12" />
                </View>
                <View className="absolute bottom-2 left-10">
                    <Image
                        source={avatarImageSource}
                        className="w-44 h-44 rounded-lg"
                        resizeMode="contain"
                    />
                </View>

            </ImageBackground>
        </View>
    );
};

export default PedosphereGameEnd;