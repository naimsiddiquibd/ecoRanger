import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    return (
        <View>
            {avatar && <Image source={avatar} style={{ width: 100, height: 150 }} />}
            <Text>Name: {name}</Text>
            <Text>Country: {country}</Text>
            <Text>Coins: {coins}</Text>
        </View>
    );
};

export default MainDashboard;
