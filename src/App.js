import React, { useEffect, useRef, useState } from 'react';
import { LogBox, AppState } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector, useDispatch } from 'react-redux';
import ReactMoE, { MoEAppStatus } from 'react-native-moengage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Splash from './screen/SplashScreen';
import ProductListing from './screen/ProductListingScreen';
import SignUpScreen from './screen/SignUpScreen';
import FeedbackScreen from './screen/FeedbackScreen';
import UserProfile from './screen/UserProfileScreen';
import SetSleepTimerScreen from './screen/SetSleepTimerScreen';
import ProductCartScreen from './screen/ProductCartScreen';
import AppDrawer from './screen/Drawer';
import OTPScreen from './screen/OtpScreen';
import SeriesPartScreen from './screen/SeriesPartScreen';
import SeriesCollectionScreen from './screen/SeriesCollectionScreen';
import InviteAndRefer from './screen/InviteAndReferScreen';
import AboutUs from './screen/AboutUs';
import { setUserDetailInCrashlytics } from './constants';
import { Auth, Crashlytics } from './firebase';
import linking from './linking';
import { analytics } from './utils/analytics';
import store from './store/store';
import { Settings } from 'react-native-fbsdk-next';
import Language from './screen/SelectLanguage';
import { ExpertScreen } from './screen/ExpertScreen';
import TrackPlayerScreen from './screen/TrackPlayerScreen';
import { initializeTrackPlayer } from './utils/MediaPlayerUtils';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator } from './components/ActivityIndicator';
import BackgroundTimer from 'react-native-background-timer';
import { formatPlayerTime, processStreak } from './utils/common.utils';
import {
  getAvailableLanguages,
  setInitRoute,
  setMoeNotificationPayload,
  setShopifyClient,
} from './store/UiSlice';
import database from '@react-native-firebase/database';
import { getItemFromAsyncStorage, setItemInAsyncStorage } from './storage';
import GetInTouchScreen from './screen/GetInTouchScreen';
import FavouriteScreen from './screen/FavouriteScreen';
import ProductDetail from './screen/ProductDetailScreen';
import CheckOutScreen from './screen/CheckOutScreen';
import SetAgeGender from './screen/SetAgeAndGenderScreen';
import QuestionScreen from './screen/QuestionScreen';
import Client from 'shopify-buy';
import SetUserName from './screen/SetNameScreen';
Settings.initializeSDK();
const Stack = createStackNavigator();
ReactMoE.setEventListener('pushClicked', notificationPayload => {
  if (notificationPayload) {
    store.dispatch(
      setMoeNotificationPayload(
        notificationPayload?.payload ||
          notificationPayload?.clickAction?.payload?.kvPair,
      ),
    );
  }
});
const App = () => {
  Settings.initializeSDK();
  GoogleSignin.configure({
    webClientId:
      '1016382853563-hbpi26hq9nuer1qomuldl9l91rptgu2b.apps.googleusercontent.com',
    offlineAccess: true,
  });
  const songState = usePlaybackState();
  const trackProgress = useProgress();
  const navigationRef = useRef();
  const routeNameRef = useRef();
  const user = Auth().currentUser;
  const dispatch = useDispatch();
  const sleepTime = useSelector(state => state.ui.sleepTimer);
  const currentTrack = useSelector(state => state.ui.currentTrack);
  const currentLanguage = useSelector(state => state.ui.currentLanguage);
  const availableLanguages = useSelector(state => state.ui.availableLanguages);
  const [timeId, setTimeId] = useState(0);

  useEffect(() => {
    handleInitRoute();
    dispatch(getAvailableLanguages());
    initApp();
    ReactMoE.initialize();
    ReactMoE.showInApp();
    ReactMoE.setEventListener('inAppCampaignClicked', inAppInfo => {
      dispatch(setMoeNotificationPayload(inAppInfo?.navigation?.keyValuePair));
    });
  }, []);

  const handleInitRoute = async () => {
    await database()
      .ref('/configs/initialRoute')
      .once('value')
      .then(data => {
        dispatch(setInitRoute(data.val()));
      });
  };

  const initApp = async () => {
    const client = Client.buildClient({
      domain: 'nishkarsh-1.myshopify.com',
      storefrontAccessToken: 'aeba4c8601641c23e407888211711a65',
    });

    dispatch(setShopifyClient(client));

    if (user?.metadata?.creationTime === user?.metadata?.lastSignInTime) {
      ReactMoE.setAppStatus(MoEAppStatus.Install);
    }
    Crashlytics().log('App mounted.');

    if (user) {
      setUserDetailInCrashlytics(user.phoneNumber, user.displayName);
      await processStreak({ userId: user?.uid, streakType: 'app_visit' });
    }
  };

  const stopTrackWithSleepTimerInForeground = async () => {
    if (sleepTime !== null) {
      if (trackProgress?.position?.toFixed() === sleepTime?.toFixed()) {
        await TrackPlayer.seekTo(trackProgress?.position + 1);
        await TrackPlayer.pause();
        analytics.trackEvent('content_pause', {
          action_source: 'sleepTimer',
          category: currentTrack?.type,
          subcategory: currentTrack?.categories?.length
            ? currentTrack?.categories[0]
            : '',
          title: currentTrack?.title,
          artist: currentTrack?.artist,
          language: availableLanguages[currentLanguage],
          id: currentTrack?.id,
          current_time: formatPlayerTime(sleepTime),
          full_time: currentTrack?.duration,
        });
      }
    }
  };

  useEffect(() => {
    stopTrackWithSleepTimerInForeground();
  }, [trackProgress?.position, sleepTime]);

  useEffect(() => {
    initializeTrackPlayer();
    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  const saveLastPlayedSong = async () => {
    let lastPlayedTrack = await getItemFromAsyncStorage('lastPlayedTrack');
    if (lastPlayedTrack === '') {
      if (trackProgress?.position > 300) {
        setItemInAsyncStorage('lastPlayedTrack', currentTrack);
      }
    }
    lastPlayedTrack = JSON.parse(lastPlayedTrack);
    if (lastPlayedTrack.title !== currentTrack.title) {
      if (trackProgress?.position > 300) {
        setItemInAsyncStorage('lastPlayedTrack', currentTrack);
      }
    }
  };

  const trackComplete = () => {
    if (formatPlayerTime(trackProgress?.position) !== '0:00') {
      if (
        trackProgress?.position?.toFixed() ===
        trackProgress?.duration?.toFixed()
      ) {
        analytics.trackEvent('content_close', {
          action_source: 'content_complete',
          category: currentTrack?.type,
          subcategory: currentTrack?.categories?.length
            ? currentTrack?.categories[0]
            : '',
          title: currentTrack?.title,
          artist: currentTrack?.artist,
          language: availableLanguages[currentLanguage],
          id: currentTrack?.id,
          current_time: formatPlayerTime(trackProgress?.position),
          full_time: currentTrack?.duration,
        });
      }
    }
  };

  const pauseTrackInBackground = async () => {
    try {
      await TrackPlayer.pause().catch(() => null);
      analytics.trackEvent('content_pause', {
        action_source: 'sleepTimer',
        category: currentTrack?.type,
        subcategory: currentTrack?.categories?.length
          ? currentTrack?.categories[0]
          : '',
        title: currentTrack?.title,
        artist: currentTrack?.artist,
        language: availableLanguages[currentLanguage],
        id: currentTrack?.id,
        current_time: formatPlayerTime(sleepTime),
        full_time: currentTrack?.duration,
      });
    } catch (error) {
      analytics.trackEvent('app', {
        appState: 'background',
        logType: 'error',
        error,
      });
      return null;
    }
  };

  useEffect(() => {
    saveLastPlayedSong();
    trackComplete();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        analytics.trackEvent('app', { appState: 'background' });

        if (
          sleepTime == null ||
          songState !== State.Playing ||
          trackProgress?.duration < sleepTime
        ) {
          return;
        }

        let backGroundTimeOut = sleepTime - trackProgress?.position?.toFixed();
        if (backGroundTimeOut > 0) {
          let convertBackGroundTimerInMillSec = backGroundTimeOut * 1000;
          let timeOutId = BackgroundTimer.setTimeout(() => {
            pauseTrackInBackground();
          }, convertBackGroundTimerInMillSec);
          setTimeId(timeOutId);
        }
      }
    });
    return () => {
      subscription.remove();
    };
  }, [trackProgress?.position]);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        BackgroundTimer.clearTimeout(timeId);
        analytics.trackEvent('app', { appState: 'foreground' });
      }
    });
    return () => {
      subscription.remove();
    };
  }, [timeId]);

  return (
    <SafeAreaProvider style={{ backgroundColor: '#0B173C' }}>
      <NavigationContainer
        linking={linking}
        ref={navigationRef}
        onReady={() =>
          (routeNameRef.current =
            navigationRef?.current?.getCurrentRoute()?.name)
        }
        onStateChange={async () => {
          const previousRouteName = routeNameRef?.current;
          const currentRouteName =
            navigationRef?.current?.getCurrentRoute()?.name;
          if (previousRouteName !== currentRouteName) {
            analytics.trackScreenView(currentRouteName, currentRouteName);
          }
          routeNameRef.current = currentRouteName;
        }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#0B173C' },
            ...TransitionPresets.SlideFromRightIOS,
          }}
          initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={Splash} />
          <Stack.Screen name="LanguagePicker" component={Language} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="OtpScreen" component={OTPScreen} />
          <Stack.Screen name="SetName" component={SetUserName} />
          <Stack.Screen name="HomeScreen" component={AppDrawer} />
          <Stack.Screen
            options={{
              gestureEnabled: true,
              gestureDirection: 'vertical',
              cardStyleInterpolator:
                CardStyleInterpolators.forBottomSheetAndroid,
            }}
            name="TrackPlayerScreen"
            component={TrackPlayerScreen}
          />
          <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="InviteAndRefer" component={InviteAndRefer} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="Experts" component={ExpertScreen} />
          <Stack.Screen name="SetSleepTimer" component={SetSleepTimerScreen} />
          <Stack.Screen name="GetInTouch" component={GetInTouchScreen} />
          <Stack.Screen name="Favourite" component={FavouriteScreen} />
          <Stack.Screen name="ProductListing" component={ProductListing} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="ProductCart" component={ProductCartScreen} />
          <Stack.Screen name="CheckOut" component={CheckOutScreen} />
          <Stack.Screen name="SetAgeGender" component={SetAgeGender} />
          <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
          <Stack.Screen name="SeriesPart" component={SeriesPartScreen} />
          <Stack.Screen
            name="SeriesCollection"
            component={SeriesCollectionScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const GestureWrapper = () => {
  const loading = useSelector(state => state.ui.loading);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
      {loading && <ActivityIndicator />}
    </GestureHandlerRootView>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <GestureWrapper />
    </Provider>
  );
};

export default AppWrapper;
LogBox.ignoreLogs(['Reanimated 2']);
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
