import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoriesScreen from '~/screen/StoriesScreen';
import MusicScreen from '~/screen/MusicScreen';
import ZenSparkScreen from '~/screen/ZensparkScreen';
import MeditationScreen from '~/screen/MeditationScreen';
import { scaledValue } from '../utils/design.utils';
import FastImage from 'react-native-fast-image';
import { TransitionPresets } from '@react-navigation/stack';
import bagIcon from '../../assets/images/bag.png';
import linearBg from '../../assets/images/linear-Background.png';
import { FONTS } from '../constants';
import ProductListing from '../screen/ProductListingScreen';
import { useSelector } from 'react-redux';

const BottomTabs = createBottomTabNavigator();

export const TabNavigation = () => {
  const initRoute = useSelector(state => state.ui.initRoute);
  return (
    <BottomTabs.Navigator
      initialRouteName={initRoute}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { ...styles.tabBarStyle },
        tabBarInactiveTintColor: '#97A4C5',
        tabBarActiveTintColor: '#FFFFFF',
        tabBarBackground: () => (
          <Image source={linearBg} style={styles.bottomTabBg} />
        ),
      }}
      sceneContainerStyle={styles.sceneContainerStyle}>
      <BottomTabs.Screen
        name="Music"
        component={MusicScreen}
        options={{
          tabBarLabel: 'Music',
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ focused }) => {
            const image = focused
              ? require('../../assets/images/activeMusicTab.png')
              : require('../../assets/images/musicTab.png');
            return (
              <FastImage
                style={styles.tabBarIconStyle}
                source={image}
                resizeMode={FastImage.resizeMode.contain}
              />
            );
          },
        }}
      />

      <BottomTabs.Screen
        name="Stories"
        component={StoriesScreen}
        options={{
          tabBarLabel: 'Stories',
          tabBarLabelStyle: styles.tabBarLabelStyle,
          ...TransitionPresets.SlideFromRightIOS,
          tabBarIcon: ({ focused }) => {
            const image = focused
              ? require('../../assets/images/activeStoriesTab.png')
              : require('../../assets/images/storiesTab.png');
            return (
              <FastImage
                style={styles.tabBarIconStyle}
                source={image}
                resizeMode={FastImage.resizeMode.contain}
              />
            );
          },
        }}
      />

      <BottomTabs.Screen
        name="Shop"
        component={ProductListing}
        options={{
          tabBarLabel: 'Shop',
          tabBarLabelStyle: styles.tabBarLabelStyle,
          ...TransitionPresets.SlideFromRightIOS,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.avatarIcon(focused)}>
                <Image
                  source={bagIcon}
                  tintColor="#0B1638"
                  style={{
                    width: scaledValue(15.24),
                    height: scaledValue(17),
                  }}
                />
              </View>
            );
          },
        }}
      />

      <BottomTabs.Screen
        name="Meditation"
        component={MeditationScreen}
        options={{
          tabBarLabel: 'Meditation',
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ focused }) => {
            const image = focused
              ? require('../../assets/images/meditationActive.png')
              : require('../../assets/images/meditation.png');
            return (
              <FastImage
                style={styles.tabBarIconStyle}
                source={image}
                resizeMode={FastImage.resizeMode.contain}
              />
            );
          },
        }}
      />

      <BottomTabs.Screen
        name="Quotes"
        component={ZenSparkScreen}
        options={{
          tabBarLabel: 'Motivation',
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ focused }) => {
            const image = focused
              ? require('../../assets/images/motivation-active.png')
              : require('../../assets/images/motivation.png');
            return (
              <FastImage
                style={styles.tabBarIconStyle}
                source={image}
                resizeMode={FastImage.resizeMode.contain}
              />
            );
          },
        }}
      />
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: scaledValue(10),
    marginBottom: scaledValue(12),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    letterSpacing: scaledValue(0.2),
  },
  tabBarIconStyle: {
    width: scaledValue(16),
    height: scaledValue(16),
  },

  tabBarStyle: {
    height: scaledValue(60),
    backgroundColor: 'transparent',
    borderTopWidth: scaledValue(0),
    paddingTop: scaledValue(10),
    zIndex: 2,
  },
  sceneContainerStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  bottomTabBg: {
    height: scaledValue(56),
    width: scaledValue(360),
    borderTopLeftRadius: scaledValue(18),
    borderTopRightRadius: scaledValue(18),
  },
  avatarIcon: focused => ({
    backgroundColor: '#ffffff',
    width: focused ? scaledValue(38) : scaledValue(34),
    height: focused ? scaledValue(38) : scaledValue(34),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaledValue(100),
    marginBottom: scaledValue(20),
    borderColor: focused ? '#937DE2' : '',
    borderWidth: focused ? scaledValue(2) : 0,
    elevation: scaledValue(5),
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  }),
  badgeMainView: {
    backgroundColor: '#D9414F',
    position: 'absolute',
    width: scaledValue(28),
    borderRadius: scaledValue(8),
    left: scaledValue(25),
    top: 0,
    paddingBottom: scaledValue(2),
  },
  badgeText: {
    color: '#fff',
    fontSize: scaledValue(8),
    textAlign: 'center',
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    letterSpacing: scaledValue(0.8),
  },
});
