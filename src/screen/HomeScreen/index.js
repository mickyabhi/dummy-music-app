import React, { useEffect } from 'react';
import { View, Linking, StatusBar } from 'react-native';
import database from '@react-native-firebase/database';
import { Auth } from '~/firebase';
import RateUsModal from '~/components/DrawerContent/Component/RateUsModal';
import { style } from '../AppScreens/style';
import { analytics } from '~/utils/analytics';
import { TabNavigation } from '~/navigations/AppTabNavigator';
import { useDispatch, useSelector } from 'react-redux';
import messaging, { firebase } from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { setLoading, toggleRateUsModal } from '~/store/UiSlice';
import { updateUserInfo } from '~/store/UserInfoSlice';
import BottomPlayer from '~/components/BottomPlayer';
import { State, usePlaybackState } from 'react-native-track-player';

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const songState = usePlaybackState();
  const navigation = useNavigation();
  const rateUsModal = useSelector(state => state.ui.rateUsModal);
  const moeNotificationPayload = useSelector(
    state => state.ui.moeNotificationPayload,
  );
  const userIdentifier =
    Auth()?.currentUser?.phoneNumber?.replace('+', '_') ||
    Auth()?.currentUser?.email?.split('.').join('_');
  const saveUserInfo = async () => {
    if (Auth()?.currentUser) {
      dispatch(
        updateUserInfo({
          username: Auth()?.currentUser?.displayName,
          email: Auth()?.currentUser?.email,
          phoneNumber: Auth()?.currentUser?.phoneNumber,
          isLoggedIn: true,
          id: Auth()?.currentUser?.uid,
        }),
      );
      const usrName = Auth()?.currentUser?.displayName;
      const deviceToken = await messaging()
        .getToken()
        .then(token => token);
      database()
        .ref('/users/' + userIdentifier)
        .once('value')
        .then(snapshot => {
          if (!snapshot.exists()) {
            const userRef = database()?.ref('users');
            userRef
              ?.child(userIdentifier)
              ?.update({ name: usrName, deviceToken: deviceToken });
          }
        });
    }
  };

  useEffect(() => {
    handleNotificationClick(moeNotificationPayload);
  }, [moeNotificationPayload]);

  const handleNotificationClick = async message => {
    if (message?.openLink || message?.data?.openLink) {
      await Linking.openURL(message?.openLink || message?.data?.openLink);
      return;
    }
    if (message?.screenName || message?.data?.screenName) {
      dispatch(setLoading(true));
      navigation.navigate(message?.screenName || message?.data?.screenName);
      dispatch(setLoading(false));
      return;
    }

    if (message?.language || message?.data?.language) {
      let messageObj = {};
      messageObj = {
        language: message?.language || message?.data?.language,
        type: message?.type || message?.data?.type,
        id: message?.id || message?.data?.id,
      };
      dispatch(setLoading(true));
      navigation.navigate('TrackPlayerScreen', messageObj);
      dispatch(setLoading(false));
    }
  };

  const notificationHandler = async () => {
    firebase
      .messaging()
      .getInitialNotification()
      .then(remoteMessage => handleNotificationClick(remoteMessage));
    firebase.messaging().onNotificationOpenedApp(remoteMessage => {
      handleNotificationClick(remoteMessage);
    });
  };

  const subscribeTopic = () => {
    if (userIdentifier?.includes('_91')) {
      firebase
        .messaging()
        .subscribeToTopic(userIdentifier)
        .then(() => console.log('Subscribed to topic!'))
        .catch(() => null);
    }
  };

  useEffect(() => {
    saveUserInfo();
    notificationHandler();
    subscribeTopic();
  }, []);

  return (
    <View style={style.homeScreenView}>
      <StatusBar backgroundColor="#0B173C" />
      <BottomPlayer
        isVisible={songState === State.Playing || songState === State.Paused}
      />
      <TabNavigation />
      <RateUsModal
        visible={rateUsModal}
        hideModal={() => {
          analytics.trackEvent('rate_us', { CTA: 'Cross' });
          dispatch(toggleRateUsModal(false));
        }}
        onPress={async () => {
          dispatch(toggleRateUsModal(false));
          Linking.openURL(
            'https://play.google.com/store/apps/details?id=com.neend',
          );
          analytics.trackEvent('rate_us', { CTA: 'Rate On Play Store' });
        }}
      />
    </View>
  );
};
