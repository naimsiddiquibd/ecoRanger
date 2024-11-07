import React, { useEffect, useState } from 'react';
import { View, TextInput, Alert, StatusBar, ImageBackground, Text, Image, TouchableOpacity } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import welcomeScreenBackgroundImage from "@/assets/images/s1-bg.png";
import formBG from "@/assets/images/PersonalInformation/form-bg.png";
import avatar4Image from "@/assets/images/Characters/poki.png";
import avatar5Image from "@/assets/images/Characters/joe.png";
import avatar6Image from "@/assets/images/Characters/moki.png";
import { useFonts } from 'expo-font';
import CountryPicker from 'react-native-country-picker-modal';

const PersonalInformation = () => {
    const [name, setName] = useState('Pookie');
    const [countryCode, setCountryCode] = useState('US');
    const [country, setCountry] = useState({
        name: 'United States',
        cca2: 'US'
    });

    useEffect(() => {
        NavigationBar.setVisibilityAsync('hidden');
        return () => {
            NavigationBar.setVisibilityAsync('visible');
        };
    }, []);

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const storedAvatar = await AsyncStorage.getItem('selectedAvatar');
            setAvatar(storedAvatar ? JSON.parse(storedAvatar) : null);
        };
        loadData();
    }, []);
    console.log("Avatar:", avatar);

    const handleSave = async () => {
        if (name && country) {
            try {
                await AsyncStorage.setItem('userName', name);
                await AsyncStorage.setItem('userCountry', country.name);
                await AsyncStorage.setItem('userCoins', '100');
                console.log('Success', 'Profile saved successfully!');
                router.push("/MainDashboard");
            } catch (error) {
                console.log('Error', 'Failed to save data.');
            }
        } else {
            Alert.alert('Error', 'Please fill in both fields.');
        }
    };

    const router = useRouter();

    const [loaded] = useFonts({
        'MineCrafter': require('@/assets/fonts/MineCrafter 3 Regular.ttf'),
        'EchoRanger': require('@/assets/fonts/SpaceMono-Regular.ttf'),
    });

    if (!loaded) {
        return <Text>Loading...</Text>;
    }

    const avatarImageSource = avatar === 1 ? avatar4Image : avatar === 2 ? avatar5Image : avatar === 3 ? avatar6Image : null;

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
                        source={require('@/assets/images/PersonalInformation/personal-information-text.png')}
                        className="w-[540px] h-auto"
                        resizeMode="contain"
                    />
                </View>
                <View className="mt-1 relative">
                    <Image
                        source={formBG}
                        className="w-auto h-48 rounded-lg"
                        resizeMode="contain"
                    />
                    <View className="absolute bottom-7 left-5">
                        <Image
                            source={avatarImageSource}
                            className="w-36 h-36 rounded-lg"
                            resizeMode="contain"
                        />
                    </View>
                    <View className="absolute top-10 left-40">
                        <Text className=" text-gray-700" style={{ fontFamily: 'MineCrafter', fontSize: 10 }}>
                            ENTER NAME
                        </Text>
                        <TextInput
                            placeholder="EchoRanger"
                            value={name}
                            onChangeText={setName}
                            className=" bg-white p-2 rounded-lg w-36 h-[35px] text-[16px] font-bold text-gray-600"
                        />
                        <Text className="mt-2 text-gray-700" style={{ fontFamily: 'MineCrafter', fontSize: 10 }}>
                            CHOOSE COUNTRY
                        </Text>
                        <View className=" bg-white pl-2 rounded-lg w-36 h-[38px] flex-row items-center justify-start">
                            <CountryPicker
                                countryCode={countryCode}
                                withFlag
                                withFilter
                                onSelect={(selectedCountry) => {
                                    setCountryCode(selectedCountry.cca2);
                                    setCountry(selectedCountry);
                                }}
                                containerButtonStyle={{ flexDirection: 'row', alignItems: 'center' }}
                            />
                            <Text className="text-[16px] font-bold -ml-2 text-gray-600">
                                {country?.name || 'United States'}
                            </Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={handleSave}>
                    <Image
                        source={require('@/assets/images/PersonalInformation/done.png')}
                        className="w-auto h-36 z-0 self-center absolute -bottom-[115px]"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default PersonalInformation;
