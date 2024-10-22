import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StatusBar, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from 'expo-navigation-bar';
import welcomeScreenBackgroundImage from "@/assets/images/s1-bg.png";

const MainDashboard = () => {
    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [coins, setCoins] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            const storedAvatar = await AsyncStorage.getItem('selectedAvatar');
            const storedName = await AsyncStorage.getItem('userName');
            const storedCountry = await AsyncStorage.getItem('userCountry');
            const storedCoins = await AsyncStorage.getItem('userCoins');
            setAvatar(storedAvatar ? JSON.parse(storedAvatar) : null);
            setName(storedName || '');
            setCountry(storedCountry || '');
            setCoins(storedCoins || 0);
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
            {avatar && <Image source={avatar} style={{ width: 100, height: 150 }} />}
            <Text>Name: {name}</Text>
            <Text>Country: {country}</Text>
            <Text>Coins: {coins}</Text>
            <ImageBackground
                source={welcomeScreenBackgroundImage}
                resizeMode='cover'
                className="flex-1 justify-start items-center"
            ></ImageBackground>
        </View>
    );
};

export default MainDashboard;
