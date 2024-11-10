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
import FunLearn from "@/assets/images/Icons/fun-and-learn.png";
import PlayGame from "@/assets/images/Icons/play-game.png";
import Calendar from "@/assets/images/Icons/calendar.png";
import Qmark from "@/assets/images/Icons/question-mark.png";
import CountBoard from "@/assets/images/Dashboard/coin-board.png";
import LetsPlayAGame from "@/assets/images/Dashboard/message-play-game.png";
import GameBG from "@/assets/images/Dashboard/game-bg.png";
import Biosphere from "@/assets/images/Dashboard/biosphere.gif";
import Hydrosphere from "@/assets/images/Dashboard/hydrosphere.gif";
import Pedosphere from "@/assets/images/Dashboard/pedosphere.gif";
import Atmosphere from "@/assets/images/Dashboard/atmosphere.gif";
import Research from "@/assets/images/Dashboard/research.png";
import WhichGame from "@/assets/images/Dashboard/message-which-game-you-want-to-play.png";
import avatar4Image from "@/assets/images/Characters/poki.png";
import avatar5Image from "@/assets/images/Characters/joe.png";
import avatar6Image from "@/assets/images/Characters/moki.png";
import { router } from 'expo-router';

const SoilStructureForSelection = () => {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [coins, setCoins] = useState(0);

  const scaleAtmosphereAnim = useRef(new Animated.Value(1)).current;
  const scaleBiosphereAnim = useRef(new Animated.Value(1)).current;
  const scaleHydrosphereAnim = useRef(new Animated.Value(1)).current;
  const scalePedosphereAnim = useRef(new Animated.Value(1)).current;

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

  const createPressHandlers = (animation, route) => ({
    handlePressIn: () => {
      Animated.spring(animation, {
        toValue: 0.9,
        useNativeDriver: true,
      }).start();
    },
    handlePressOut: () => {
      Animated.spring(animation, {
        toValue: 1,
        friction: 8,
        tension: 100,
        useNativeDriver: true,
      }).start(() => {
        router.push(route);
      });
    },
  });

  const atmosphereHandlers = createPressHandlers(scaleAtmosphereAnim, "/AtmosphereGameStart");
  const biosphereHandlers = createPressHandlers(scaleBiosphereAnim, "/BiosphereDashboard");
  const hydrosphereHandlers = createPressHandlers(scaleHydrosphereAnim, "/HydrosphereDashboard");
  const pedosphereHandlers = createPressHandlers(scalePedosphereAnim, "/PedosphereDashboard");

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
            <Image source={CountBoard} className="h-12" />
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

        {/* Game Selection Section */}
        <View className="absolute bottom-24 left-44 flex-row gap-0">
          {/* Atmosphere */}
          <Pressable onPressIn={atmosphereHandlers.handlePressIn} onPressOut={atmosphereHandlers.handlePressOut}>
            <Animated.View style={{ transform: [{ scale: scaleAtmosphereAnim }] }}>
              <View className="relative">
                <Image source={GameBG} className="w-32 h-auto rounded-lg" resizeMode="contain" />
                <Image source={Atmosphere} className="absolute bottom-32 left-5 top-10 w-20 h-20" resizeMode="contain" />
                <Text className="absolute top-[132px] text-white font-semibold left-6">Atmosphere</Text>
              </View>
            </Animated.View>
          </Pressable>

          {/* Biosphere */}
          <Pressable onPressIn={biosphereHandlers.handlePressIn} onPressOut={biosphereHandlers.handlePressOut}>
            <Animated.View style={{ transform: [{ scale: scaleBiosphereAnim }] }}>
              <View className="relative">
                <Image source={GameBG} className="w-32 h-auto rounded-lg" resizeMode="contain" />
                <Image source={Biosphere} className="absolute bottom-32 left-5 top-10 w-20 h-20" resizeMode="contain" />
                <Text className="absolute top-[132px] text-white font-semibold left-8">Biosphere</Text>
              </View>
            </Animated.View>
          </Pressable>

          {/* Hydrosphere */}
          <Pressable onPressIn={hydrosphereHandlers.handlePressIn} onPressOut={hydrosphereHandlers.handlePressOut}>
            <Animated.View style={{ transform: [{ scale: scaleHydrosphereAnim }] }}>
              <View className="relative">
                <Image source={GameBG} className="w-32 h-auto rounded-lg" resizeMode="contain" />
                <Image source={Hydrosphere} className="absolute bottom-32 left-5 top-10 w-20 h-20" resizeMode="contain" />
                <Text className="absolute top-[132px] text-white font-semibold left-6">Hydrosphere</Text>
              </View>
            </Animated.View>
          </Pressable>

          {/* Pedosphere */}
          <Pressable onPressIn={pedosphereHandlers.handlePressIn} onPressOut={pedosphereHandlers.handlePressOut}>
            <Animated.View style={{ transform: [{ scale: scalePedosphereAnim }] }}>
              <View className="relative">
                <Image source={GameBG} className="w-32 h-auto rounded-lg" resizeMode="contain" />
                <Image source={Pedosphere} className="absolute bottom-32 left-5 top-10 w-20 h-20" resizeMode="contain" />
                <Text className="absolute top-[132px] text-white font-semibold left-6">Pedosphere</Text>
              </View>
            </Animated.View>
          </Pressable>
        </View>

        {/* Avatar and Message */}
        <View className="absolute bottom-3 left-12">
          <Image source={avatarImageSource} className="w-36 h-36 rounded-lg" resizeMode="contain" />
        </View>
        <View className="absolute bottom-6 left-28">
          <Image source={WhichGame} className="w-auto h-20 rounded-lg" resizeMode="contain" />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SoilStructureForSelection;