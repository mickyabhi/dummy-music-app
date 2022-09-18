import React, { useEffect, useState } from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
  ToastAndroid,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import shareIcon from '../../../assets/images/shareIcon.png';
import AboutSong from './Components/AboutSong';
import { style } from './style';
import BackNavigationButton from '~/components/BackNavigationButton';
import { analytics } from '~/utils/analytics';
import PlayPauseButton from '~/components/PlayPauseButton';
import ResetSleepTimerModal from '~/components/ResetSleepTimerModal';
import SleepTimerButton from '~/components/SleepTimerButton';
import PlayerTime from './Components/PlayerTime';
import { SkipToBackButton, SkipToNextButton } from './Components/SkipButton';
import { setItemInAsyncStorage } from '~/storage';
import { handlePlayNewTrack } from '~/utils/MediaPlayerUtils';
import { BaseURL } from '~/constants';
import {
  setLoading,
  setPreviousTrack,
  updateCurrentTrack,
} from '~/store/UiSlice';
import urlEndPointCheck from './Utils/endPointCheck';
import database from '@react-native-firebase/database';
import { Auth } from '../../firebase';
import { useIsFocused } from '@react-navigation/native';
import shareMedia from '~/utils/shareMedia';
import Slider from '@react-native-community/slider';
import saveIcon from '../../../assets/images/save-icon.png';
import thumbIcon from '../../../assets/images/thumb-icon.png';
import activeSaveIcon from '../../../assets/images/active-save-icon.png';
import activeThumbIcon from '../../../assets/images/active-thumb-icon.png';

const TrackPlayerScreen = props => {
  const track = useProgress();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const currentTrack = useSelector(state => state.ui.currentTrack);
  const languagePref = useSelector(state => state.ui.currentLanguage);
  const availableLanguages = useSelector(state => state.ui.availableLanguages);
  const [timerModal, setTimerModal] = useState(null);
  const [sleepTime, setSleepTime] = useState(null);
  const [isFeedBackActive, setIsFeedBackActive] = useState(false);
  const [showIsFavourite, setShowIsFavourite] = useState(false);
  const [params] = useState(props?.route?.params || null);
  const dispatch = useDispatch();
  const typeOfSong = currentTrack.type;
  const userIdentifier =
    Auth()?.currentUser?.phoneNumber?.replace('+', '_') ||
    Auth()?.currentUser?.email?.split('.').join('_');
  const handleSetSleepTimer = () => {
    navigation.navigate('SetSleepTimer');
    analytics.trackEvent('sleep_timer', {
      CTA: 'Set Sleep Timer',
      Screen: 'Track Player',
    });
  };
  const submitFavouriteHandler = async () => {
    let obj = {
      language: availableLanguages[languagePref],
      subcategory: params?.subcategory,
    };

    let currentTrackData = {
      ...currentTrack,
      ...obj,
    };
    setShowIsFavourite(true);
    ToastAndroid.show(
      'Added to Saved Items',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    database().ref('favourite').child(userIdentifier).push(currentTrackData);
    analytics.trackEvent('content_favourite', {
      action_source: 'trackplayer',
      category: currentTrack?.type,
      subcategory: currentTrack?.categories?.length
        ? currentTrack?.categories[0]
        : '',
      title: currentTrack?.title,
      artist: currentTrack?.artist,
      language: availableLanguages[languagePref],
      id: currentTrack?.id,
    });
  };

  const removeFavouriteHandler = () => {
    setShowIsFavourite(false);
    ToastAndroid.show(
      'Removed from Saved Items',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
      database()
        .ref('/favourite/' + userIdentifier + '/')
        .orderByChild('id')
        .equalTo(currentTrack.id)
        .once('value', snapshot => {
          snapshot.forEach(favourite => {
            favourite.ref.remove();
          });
        }),
    );
    analytics.trackEvent('content_favourite_removed', {
      action_source: 'fav_tab',
      category: currentTrack?.type,
      subcategory: currentTrack?.categories?.length
        ? currentTrack?.categories[0]
        : '',
      title: currentTrack?.title,
      artist: currentTrack?.artist,
      language: availableLanguages[languagePref],
      id: currentTrack?.id,
    });
  };

  const fetchUserProfile = async () => {
    if (userIdentifier !== null) {
      await database()
        .ref('/users/' + userIdentifier)
        .once('value')
        .then(data => {
          setSleepTime(data.val().sleepTimer);
        });
    }
  };

  const handleToNavigateFeedBack = () => {
    navigation.navigate('FeedbackScreen', {
      mediaType: typeOfSong,
    });
    analytics.trackEvent('source_feedback', {
      source: 'full_player_screen',
      action_source: 'trackplayer',
      category: currentTrack?.type,
      subcategory: currentTrack?.categories?.length
        ? currentTrack?.categories[0]
        : '',
      title: currentTrack?.title,
    });
  };

  const isFeedBack = async () => {
    await database()
      .ref(
        '/feedbacks/' +
          typeOfSong +
          '/' +
          languagePref +
          '/' +
          currentTrack.id +
          '/' +
          userIdentifier +
          '/',
      )
      .once('value')
      .then(resp => {
        if (resp.exists()) {
          setIsFeedBackActive(true);
        }
      });
  };

  const isFavourite = async () => {
    await database()
      .ref('favourite/' + userIdentifier)
      .once('value')
      .then(resp => {
        resp?.forEach(item => {
          if (item?.val()?.id === currentTrack.id) {
            setShowIsFavourite(true);
          }
        });
      });
  };

  useEffect(() => {
    fetchUserProfile();
    isFeedBack();
    isFavourite();
  }, [isFocused]);

  const removeSleepTimerHandler = async () => {
    if (userIdentifier !== null) {
      dispatch(setLoading(true));
      const userRef = database()?.ref('users');
      await userRef
        .child(userIdentifier)
        .update({
          sleepTimer: null,
        })
        .then(() => {
          fetchUserProfile();
          dispatch(setLoading(false));
          analytics.trackEvent('sleep_timer', {
            CTA: 'Delete Sleep Timer',
            Screen: 'Track Player',
          });
          ToastAndroid.show('Sleep Timer is deleted', ToastAndroid.SHORT);
        });
    }
  };

  const updateAsyncStorage = async () => {
    const localStorageData = {
      currentTrack: currentTrack?.title,
      position: track?.position >= track?.duration ? 1 : track?.position,
    };
    let position = {
      position: track?.position,
    };

    let prevTrackData = {
      ...currentTrack,
      ...position,
    };

    dispatch(setPreviousTrack(prevTrackData));
    setItemInAsyncStorage(
      `${currentTrack?.title}-${typeOfSong}`,
      localStorageData,
    );
  };

  const loadDeepLinkTrack = async () => {
    const urlEndPoint = urlEndPointCheck({
      language: params?.language,
      type: params?.type,
    });
    if (params != null) {
      const {
        data: { data },
      } = await axios.get(`${BaseURL}/${urlEndPoint}`);
      data?.forEach(ele => {
        if (ele?.id === params?.id) {
          const reduxData = {
            ...ele,
            type: params?.type,
            artwork: BaseURL + ele?.artwork,
            url: BaseURL + ele?.url,
          };
          dispatch(updateCurrentTrack(reduxData));
          return handlePlayNewTrack(ele, params?.type);
        }
      });
    }
  };
  useEffect(() => {
    loadDeepLinkTrack();
  }, [params]);

  const sliderHandler = async value => {
    await TrackPlayer.seekTo(value);
  };
  const backHandle = () => {
    if (params != null) {
      navigation.navigate('HomeScreen');
    } else {
      navigation.goBack();
    }
    updateAsyncStorage();
  };

  return (
    <View style={style.musicPlayerView}>
      <StatusBar backgroundColor="#0B173C" />
      <ImageBackground
        resizeMode="stretch"
        style={style.trackCoverImg}
        source={
          currentTrack
            ? {
                uri: params?.trackArtWork?.includes('https')
                  ? params?.trackArtWork
                  : currentTrack.artwork,
              }
            : require('../../../assets/images/Group6825.png')
        }>
        <FastImage
          style={style.lineargradientImage}
          source={require('../../../assets/images/lineargradient.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
      </ImageBackground>
      <View style={style.backNavigationView}>
        <BackNavigationButton
          title="cross"
          size={25}
          hw={35}
          onPress={backHandle}
        />
      </View>
      <View style={style.musicPlayerMainView}>
        <AboutSong screen="TrackPlayerScreen" />
        <View style={style.trackOptionView}>
          <SkipToBackButton language={availableLanguages[languagePref]} />
          <PlayPauseButton
            showReset={
              track?.position >= track?.duration &&
              track?.duration > 0 &&
              track?.position > 0
            }
            size={26}
            hw={60}
            subcategory={params?.subcategory}
            language={availableLanguages[languagePref]}
          />
          <SkipToNextButton language={availableLanguages[languagePref]} />
        </View>
        <View style={style.trackDurationView}>
          <Slider
            value={track?.position}
            minimumValue={0}
            maximumValue={track?.duration}
            minimumTrackTintColor="#E6E7F2"
            onSlidingComplete={sliderHandler}
            style={style.slider}
            maximumTrackTintColor="#47557E"
            thumbTintColor="#937DE2"
          />
          <PlayerTime />
        </View>
      </View>
      <View style={style.shareContainer}>
        <TouchableOpacity
          style={style.alignCenterSave}
          onPress={() => {
            showIsFavourite
              ? removeFavouriteHandler()
              : submitFavouriteHandler();
          }}>
          <Image
            source={showIsFavourite ? activeSaveIcon : saveIcon}
            style={style.socialIcon}
          />
          <Text style={style.textStyle}>{`${
            showIsFavourite ? 'Saved' : 'Save'
          }`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.alignCenterView}
          onPress={handleToNavigateFeedBack}>
          <Image
            source={isFeedBackActive ? activeThumbIcon : thumbIcon}
            style={style.socialIcon}
          />
          <Text style={style.textStyle}>{`${
            isFeedBackActive ? 'Reviewed' : 'Review'
          }`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.alignCenterShare}
          onPress={() => {
            shareMedia(
              currentTrack,
              typeOfSong?.toLowerCase() || params?.mediaType,
              languagePref,
              availableLanguages,
            );

            analytics.trackEvent('content_share', {
              action_source: 'share',
              category: currentTrack?.type,
              subcategory: currentTrack?.categories?.length
                ? currentTrack?.categories[0]
                : '',
              title: currentTrack?.title,
              artist: currentTrack?.artist,
              language: availableLanguages[languagePref],
              id: currentTrack?.id,
            });
          }}>
          <Image source={shareIcon} style={style.socialIcon} />
          <Text style={style.textStyle}>Share</Text>
        </TouchableOpacity>
      </View>

      <SleepTimerButton
        editHandler={() => {
          setTimerModal(true);
          analytics.trackEvent('sleep_timer', {
            CTA: 'Edit Sleep Timer',
            Screen: 'Track Player',
          });
        }}
        deleteHandler={removeSleepTimerHandler}
        sleepTime={sleepTime}
        onPress={handleSetSleepTimer}
      />
      <ResetSleepTimerModal
        visible={timerModal}
        onDismiss={() => setTimerModal(false)}
      />
    </View>
  );
};
export default TrackPlayerScreen;
