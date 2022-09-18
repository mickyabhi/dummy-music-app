import React, { useEffect, useState } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';
import TrackPlayer from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { analytics } from '~/utils/analytics';
import { scaledValue } from '~/utils/design.utils';
import { Avatar, Drawer, IconButton } from 'react-native-paper';
import info from '~assets/images/info.png';
import clock from '~assets/images/clock.png';
import star from '~assets/images/star.png';
import logout from '~assets/images/logoutIcon.png';
import moonIcon from '~assets/images/moon_icon.png';
import inviteRefer from '~assets/images/refer_icon_2.png';
import {
  setCartCount,
  setLoading,
  toggleRateUsModal,
  updateLanguagePreference,
  setPrevCategory,
} from '~/store/UiSlice';
import musicIcon from '~assets/images/music.png';
import { useIsFocused } from '@react-navigation/native';
import pencilIcon from '../../../assets/images/pencilIcon.png';
import whatsappIcon from '../../../assets/images/whatsapp-icon.png';
import instagramIcon from '../../../assets/images/instagram.png';
import twitterIcon from '../../../assets/images/twitter.png';
import saveIcon from '../../../assets/images/book-mark-icon.png';
import messageIcon from '~assets/images/expert_button_icon.png';
import { FONTS } from '~/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getItemFromAsyncStorage } from '~/storage';
import ReactMoE from 'react-native-moengage';
import { Auth } from '~/firebase';
import { getStoriesData } from '~/store/StoriesSlice';
import { fetchZensparksData } from '~/store/ZensparkSlice';
import { fetchMusicsData } from '~/store/MusicsSlice';
import VersionInfo from 'react-native-version-info';

export const DrawerContent = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentTrack = useSelector(state => state.ui.currentTrack);
  const [sleepTimer, setSleepTimer] = useState(null);
  const twitterUrl = 'https://mobile.twitter.com/neend_app';
  const whatsappUrl = 'https://wa.me/917338058468/';
  const instagramLink = 'https://www.instagram.com/neend.app/';
  const userIdentifier =
    auth()?.currentUser?.phoneNumber?.replace('+', '_') ||
    auth()?.currentUser?.email?.split('.').join('_');

  const signOutHandler = async () => {
    try {
      dispatch(setLoading(true));
      props.navigation.closeDrawer();
      ReactMoE.logout();
      const isGoogleSignedIn = await GoogleSignin.isSignedIn();
      if (isGoogleSignedIn) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      dispatch(setCartCount(0));
      dispatch(updateLanguagePreference(null));
      dispatch(getStoriesData(null));
      dispatch(setPrevCategory(null));
      auth()
        .signOut()
        .then(() => {
          dispatch(setLoading(false));
          TrackPlayer.stop();
          navigation.replace('SignUpScreen', { initLoad: true });
          AsyncStorage.clear();
        });
    } catch (error) {
      dispatch(setLoading(false));
      console.log('signOut.error', error);
    }
  };
  const loadLastPlayedSong = async currentLanguage => {
    let lastPlayedSong = await getItemFromAsyncStorage('lastPlayedTrack');
    lastPlayedSong = JSON.parse(lastPlayedSong);
    if (currentLanguage !== null && lastPlayedSong) {
      await database()
        .ref(
          '/feedbacks/' +
            lastPlayedSong.type +
            '/' +
            currentLanguage +
            '/' +
            lastPlayedSong.id +
            '/' +
            userIdentifier +
            '/',
        )
        .once('value')
        .then(data => {
          if (!data.exists()) {
            navigation.navigate('FeedbackScreen', {
              lastTrack: lastPlayedSong,
            });
            analytics.trackEvent('source_feedback', {
              source: 'auto_pop_up',
              action_source: 'feedback',
              category: currentTrack?.type,
              subcategory: currentTrack?.categories?.length
                ? currentTrack?.categories[0]
                : '',
              title: currentTrack?.title,
            });
          }
        });
    }
  };
  const fetchUserProfile = async () => {
    if (userIdentifier !== null) {
      await database()
        .ref('/users/' + userIdentifier)
        .once('value')
        .then(data => {
          setSleepTimer(data.val().sleepTimer);
          dispatch(updateLanguagePreference(data.val().languagePreference));
          loadLastPlayedSong(data.val().languagePreference);
        });
    }
  };
  const loadSleepTimer = async () => {
    if (userIdentifier !== null) {
      await database()
        .ref('/users/' + userIdentifier)
        .once('value')
        .then(data => {
          setSleepTimer(data.val().sleepTimer);
        });
    }
  };

  const setMoengageData = () => {
    if (Auth()?.currentUser?.email?.includes('@truecaller.in')) {
      ReactMoE.setUserName(Auth()?.currentUser?.displayName);
      return;
    }

    if (Auth()?.currentUser?.providerData[0]?.providerId === 'google.com') {
      if (Auth()?.currentUser?.uid) {
        ReactMoE.setUserUniqueID(Auth()?.currentUser?.uid);
      }
      if (Auth()?.currentUser?.displayName) {
        ReactMoE.setUserName(Auth()?.currentUser?.displayName);
      }
      if (Auth()?.currentUser?.email) {
        ReactMoE.setUserEmailID(Auth()?.currentUser?.email);
      }
      if (Auth()?.currentUser?.phoneNumber) {
        ReactMoE.setUserContactNumber(Auth()?.currentUser?.phoneNumber);
      }
    }

    if (Auth()?.currentUser?.providerData[0]?.providerId === 'phone') {
      if (Auth()?.currentUser?.phoneNumber) {
        ReactMoE.setUserUniqueID(Auth()?.currentUser?.phoneNumber);
      }
      if (Auth()?.currentUser?.displayName) {
        ReactMoE.setUserName(Auth()?.currentUser?.displayName);
      }
      if (Auth()?.currentUser?.email) {
        ReactMoE.setUserEmailID(Auth()?.currentUser?.email);
      }
      if (Auth()?.currentUser?.phoneNumber) {
        ReactMoE.setUserContactNumber(Auth()?.currentUser?.phoneNumber);
      }
    }
  };
  useEffect(() => {
    dispatch(fetchZensparksData());
    dispatch(fetchMusicsData());
    analytics.setUserProperties('app_version', VersionInfo.buildVersion);
  }, []);

  useEffect(() => {
    loadSleepTimer();
  }, [isFocused, userIdentifier]);

  useEffect(() => {
    fetchUserProfile();
    setMoengageData();
  }, [userIdentifier]);

  return (
    <View style={styles.drawerView}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeaderView}>
          <TouchableOpacity
            style={{
              padding: scaledValue(10),
              marginLeft: scaledValue(-10),
            }}
            onPress={() => {
              navigation.navigate('Home');
              analytics.trackEvent('Drawer', {
                CTA: 'Close Drawer',
              });
            }}>
            <FastImage
              source={moonIcon}
              style={styles.crossIcon}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
          <Text style={styles.drawerHeaderTitleText}>neend</Text>
        </View>
        <Drawer.Section>
          <Drawer.Item
            icon={() => (
              <FastImage
                style={styles.drawerIcon}
                source={saveIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
            label={<Text style={styles.drawerItemLabel}>Saved items</Text>}
            style={styles.drawerItem}
            onPress={() => {
              props.navigation.closeDrawer();
              navigation.navigate('Favourite');
              dispatch(setLoading(true));
            }}
          />

          <Drawer.Item
            icon={() => (
              <FastImage
                style={styles.drawerIcon}
                source={clock}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
            right={() =>
              sleepTimer && (
                <>
                  <Text style={styles.timerStyle}>{sleepTimer}</Text>
                  <IconButton
                    style={styles.pencilIcon}
                    size={scaledValue(8)}
                    color="#97A4C5"
                    icon={pencilIcon}
                  />
                </>
              )
            }
            label={<Text style={styles.drawerItemLabel}>Sleep timer</Text>}
            onPress={() => {
              props.navigation.closeDrawer();
              navigation.navigate('SetSleepTimer');
            }}
            style={styles.drawerItem}
          />

          <Drawer.Item
            icon={() => (
              <FastImage
                style={styles.drawerIcon}
                source={musicIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
            label={<Text style={styles.drawerItemLabel}>Audio language</Text>}
            style={styles.drawerItem}
            onPress={() => {
              props.navigation.closeDrawer();
              navigation.navigate('LanguagePicker', {
                inAppLanguagePicker: true,
              });
            }}
          />

          <Drawer.Item
            icon={() => (
              <FastImage
                style={styles.drawerIcon}
                source={messageIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
            label={<Text style={styles.drawerItemLabel}>Talk to expert</Text>}
            onPress={() => {
              props.navigation.closeDrawer();
              navigation.navigate('Experts');
              analytics.trackEvent('experts_button_clicked', {});
            }}
            style={styles.drawerItem}
          />

          <Drawer.Item
            icon={() => (
              <FastImage
                style={styles.drawerIcon}
                source={inviteRefer}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
            label={<Text style={styles.drawerItemLabel}>Refer & earn</Text>}
            onPress={() => {
              props.navigation.closeDrawer();
              navigation.navigate('InviteAndRefer');
            }}
            style={styles.drawerItem}
          />

          {/* <Drawer.Item
            icon={() => (
              <FastImage
                style={styles.drawerIcon}
                source={email}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
            label={<Text style={styles.drawerItemLabel}>Contact us</Text>}
            onPress={() => {
              props.navigation.closeDrawer();
              Linking.openURL('mailto:care@neend.app');
              analytics.trackEvent('Drawer', {
                CTA: 'Contact Us',
              });
            }}
            style={[styles.drawerItem, { marginTop: scaledValue(-3) }]}
          /> */}

          <Drawer.Item
            icon={() => (
              <FastImage
                style={styles.drawerIcon}
                source={star}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
            label={<Text style={styles.drawerItemLabel}>Rate us</Text>}
            onPress={() => {
              props.navigation.closeDrawer();
              dispatch(toggleRateUsModal(true));
              navigation.dispatch(DrawerActions.closeDrawer());
              analytics.trackEvent('Drawer', {
                CTA: 'Rate Us',
              });
            }}
            style={styles.drawerItem}
          />

          <Drawer.Item
            icon={() => (
              <FastImage
                style={styles.drawerIcon}
                source={info}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
            label={<Text style={styles.drawerItemLabel}>About us</Text>}
            onPress={() => navigation.navigate('AboutUs')}
            style={styles.drawerItem}
          />

          {/* <Drawer.Item
            icon={() => (
              <FastImage
                style={[styles.drawerIcon, { resizeMode: 'contain' }]}
                source={onboardingIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
            label={<Text style={styles.drawerItemLabel}>Your profile</Text>}
            onPress={() => {
              try {
                props.navigation.closeDrawer();
                navigation.navigate('OnboardingScreen', {
                  screen: 'WelcomeScreen',
                });
              } catch (error) {
                console.log('failed to launch', error);
              }
            }}
            style={styles.drawerItem}
          /> */}

          {/* <ScrollView>
            <View style={styles.languageButtonContainer}>
              {Object.keys(availableLanguages).map(x => {
                return (
                  <LanguageButton
                    key={x}
                    label={availableLanguages[x]}
                    value={x}
                  />
                );
              })}
            </View>
          </ScrollView> */}
        </Drawer.Section>
        <View style={styles.followUsOnView}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(whatsappUrl);
              analytics.trackEvent('Drawer', {
                CTA: 'whatsapp_button',
              });
            }}
            style={styles.socialIconsTouchAble}>
            <Avatar.Image size={scaledValue(30)} source={whatsappIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(twitterUrl);
              analytics.trackEvent('Drawer', {
                CTA: 'twitter_button',
              });
            }}
            style={styles.socialIconsTouchAble}>
            <Avatar.Image size={scaledValue(30)} source={twitterIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(instagramLink);
              analytics.trackEvent('Drawer', {
                CTA: 'instagram_button',
              });
            }}
            style={styles.socialIconsTouchAble}>
            <Avatar.Image size={scaledValue(30)} source={instagramIcon} />
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section>
        <View style={styles.logOutButtonView}>
          <Drawer.Item
            icon={() => (
              <FastImage
                style={styles.logoutIcon}
                source={logout}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
            label={<Text style={styles.drawerItemLabel}>Logout</Text>}
            onPress={signOutHandler}
            style={styles.drawerItem}
          />
        </View>
      </Drawer.Section>
    </View>
  );
};
const styles = StyleSheet.create({
  drawerHeaderView: {
    flexDirection: 'row',
    paddingLeft: scaledValue(16),
    height: scaledValue(60),
    borderBottomColor: '#1D2F5D',
    borderBottomWidth: scaledValue(2),
    alignItems: 'center',
  },
  drawerHeaderTitleText: {
    color: '#fff',
    fontSize: scaledValue(16),
    marginLeft: scaledValue(15.44),
    fontFamily: FONTS.COMFORTAA_SEMIBOLD,
    letterSpacing: scaledValue(0.8),
    marginBottom: scaledValue(5),
  },
  crossIcon: {
    width: scaledValue(31.56),
    height: scaledValue(27.7),
  },
  drawerItemLabel: {
    color: '#fff',
    fontSize: scaledValue(14),
    letterSpacing: scaledValue(0.8),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  drawerItem: {
    paddingVertical: scaledValue(5),
  },
  drawerView: {
    flex: 1,
  },
  drawerIcon: {
    width: scaledValue(24),
    height: scaledValue(24),
  },
  logoutIcon: {
    width: scaledValue(16),
    height: scaledValue(16),
  },
  drawerUserIcon: {
    width: scaledValue(16),
    height: scaledValue(21),
    top: scaledValue(18),
    left: scaledValue(23),
    position: 'absolute',
  },
  logOutButtonView: {
    borderTopColor: '#1D2F5D',
    borderTopWidth: scaledValue(0.5),
  },
  timerStyle: {
    color: '#97A4C5',
    fontSize: scaledValue(12),
  },
  languageButtonContainer: {
    paddingHorizontal: scaledValue(20),
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: scaledValue(50),
  },
  followUsOnView: {
    flexDirection: 'row',
    paddingLeft: scaledValue(58),
    marginTop: scaledValue(5),
  },
  followUsOnText: {
    fontFamily: 'Helvetica Neue',
    fontSize: scaledValue(16),
    textAlign: 'left',
    color: '#fff',
  },
  socialIconsTouchAble: {
    height: scaledValue(42),
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: scaledValue(24),
  },
  contactView: {
    backgroundColor: 'rgba(58, 70, 166, 1)',
    flexDirection: 'row',
    width: scaledValue(120),
    justifyContent: 'space-between',
    paddingHorizontal: scaledValue(14),
    paddingVertical: scaledValue(5),
    borderRadius: scaledValue(40),
  },
  contactText: { fontFamily: FONTS.OPEN_SANS_REGULAR },
});
