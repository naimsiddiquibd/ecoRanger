import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ImageBackground, Pressable, Animated } from 'react-native';
import Slider from '@react-native-community/slider'; // Import the Slider
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
import Water from "@/assets/images/AtmosphereGame/water.png";
import AtmosephereBG from "@/assets/images/AtmosphereGame/AtmosphereGameBg.png";
import avatar4Image from "@/assets/images/Characters/poki.png";
import avatar5Image from "@/assets/images/Characters/joe.png";
import avatar6Image from "@/assets/images/Characters/moki.png";
import { router } from 'expo-router';
import { StatusBar } from 'react-native';

const AtmosphereGameStart = () => {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [coins, setCoins] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [waterLevel, setWaterLevel] = useState(0); // State to control water level

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

  const avatarImageSource = avatar === 1 ? avatar4Image : avatar === 2 ? avatar5Image : avatar === 3 ? avatar6Image : null;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start(() => {
      router.push("/GameSelectionDashboard");
    });
    console.log('Play pressed!');
  };

  return (
    <View className="flex-1">
      <StatusBar hidden={true} />
      <ImageBackground
        source={AtmosephereBG}
        resizeMode='cover'
        className="flex-1 justify-start items-center"
      >
        {/* Top Left Corner */}
        <View className="absolute top-3 left-3 z-20">
          <View className="flex-row gap-3">
            <Image source={Profile} className="w-12 h-12" />
            <Image source={CountBoard} className=" h-12" />
          </View>
          <View>
            <Image source={Settings} className="w-12 h-12" />
          </View>
        </View>

        {/* Top Right Corner */}
        <View className="absolute top-3 right-3 z-20">
          <View className="flex-row gap-2">
            <Image source={Research} className="h-12" />
            <Image source={Calendar} className="w-12 h-12" />
            <Image source={GroupPeople} className="w-12 h-12" />
            <Image source={HamMenu} className="w-12 h-12" />
          </View>
        </View>

        {/* Bottom Left Corner */}
        <View className="absolute bottom-3 left-3 z-20">
          <Image source={Location} className="w-12 h-12" />
          <Image source={BackArrow} className="w-12 h-12" />
        </View>

        {/* Bottom Right Corner */}
        <View className="absolute bottom-2 right-3 z-20">
          <Image source={Qmark} className="w-12 h-12" />
        </View>

        {/* Water level */}
        <View style={{ height: `${waterLevel}%` }} className="w-full bg-[#6FB5FF] absolute z-10 bottom-0">
        </View>

        {/* Water Level Slider */}
        <View className="absolute bottom-0 left-12 right-0 p-4 z-30 ">
          <Slider
            style={{ width: '30%', height: 40, borderRadius: 10}}
            minimumValue={0}
            maximumValue={100}
            value={waterLevel}
            onValueChange={(value) => setWaterLevel(value)}
            minimumTrackTintColor="#6FB5FF"
            maximumTrackTintColor="#000000"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default AtmosphereGameStart;
