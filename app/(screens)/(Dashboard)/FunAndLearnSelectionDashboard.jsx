import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ImageBackground, Pressable, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from 'expo-navigation-bar';
import welcomeScreenBackgroundImage from "@/assets/images/s1-bg.png";
import Profile from "@/assets/images/Icons/profile.png";
import Settings from "@/assets/images/Icons/settings.png";
import Location from "@/assets/images/Icons/location.png";
import BackArrow from "@/assets/images/Icons/back-arrow.png";
import HamMenu from "@/assets/images/Icons/hamburger-menu.png";
import GroupPeople from "@/assets/images/Icons/group-of-people.png";
import FunLearn from "@/assets/images/Icons/fun-and-learn.png";
import PlayGame from "@/assets/images/Icons/play-game.png";
import Calendar from "@/assets/images/Icons/calendar.png";
import Qmark from "@/assets/images/Icons/question-mark.png";
import CountBoard from "@/assets/images/Dashboard/coin-board.png";
import LetsPlayAGame from "@/assets/images/Dashboard/message-play-game.png";
import Game1 from "@/assets/images/Dashboard/game-1-biosphere.png";
import Game2 from "@/assets/images/Dashboard/game-2-atmosphere.png";
import Game3 from "@/assets/images/Dashboard/game-2-hydrosphere.png";
import Research from "@/assets/images/Dashboard/research.png";

import Atmosephere from "@/assets/images/Dashboard/atmosephere-img.png";
import Biosphere from "@/assets/images/Dashboard/biosphere-img.png";
import Pedosphere from "@/assets/images/Dashboard/pedosphere-img.png";
import Hydrosphere from "@/assets/images/Dashboard/hydrosphere-img.png";
import WhichGame from "@/assets/images/Dashboard/message-which-game-you-want-to-play.png";
import avatar4Image from "@/assets/images/Characters/poki.png";
import avatar5Image from "@/assets/images/Characters/joe.png";
import avatar6Image from "@/assets/images/Characters/moki.png";
import { router } from 'expo-router';
import { StatusBar } from 'react-native';

const FunAndLearnSelectionDashboard = () => {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [coins, setCoins] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

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
      // Navigate to the AvatarChoose route after animation completes
      router.push("/GameSelectionDashboard");
    });
    console.log('Play pressed!');
  };

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
        <View className="absolute bottom-24">
          <View className="flex-row gap-0">
            <Image
              source={Game1}
              className="w-32 h-auto rounded-lg"
              resizeMode="contain"
            />
            <Image
              source={Game2}
              className="w-32 h-auto rounded-lg"
              resizeMode="contain"
            />
            <Image
              source={Game3}
              className="w-32 h-auto rounded-lg"
              resizeMode="contain"
            />
            <Image
              source={Game3}
              className="w-32 h-auto rounded-lg"
              resizeMode="contain"
            />
           
          </View>
        </View>
        <View className="absolute bottom-3 left-12">
          <Image
            source={avatarImageSource}
            className="w-auto h-24 rounded-lg"
            resizeMode="contain"
          />
        </View>
        <View className="absolute bottom-6 left-28">
          <Image
            source={WhichGame}
            className="w-auto h-20 rounded-lg"
            resizeMode="contain"
          />
        </View>


      </ImageBackground>
    </View>
  );
};

export default FunAndLearnSelectionDashboard;