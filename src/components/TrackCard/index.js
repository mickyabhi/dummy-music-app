import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AppEventsLogger } from 'react-native-fbsdk-next';
import { TouchableRipple } from 'react-native-paper';
import TrackPlayer from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import Tag from '~/components/Tag';
import { BaseURL } from '~/constants';
import { updateCurrentTrack } from '~/store/UiSlice';
import { analytics } from '~/utils/analytics';
import { formatPlayerTime } from '~/utils/common.utils';
import { scaledValue } from '~/utils/design.utils';
import { handlePlayNewTrack } from '~/utils/MediaPlayerUtils';

const TrackCard = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.ui.currentLanguage);
  const availableLanguages = useSelector(state => state.ui.availableLanguages);
  const currentTrack = useSelector(state => state.ui.currentTrack);
  const previousTrack = useSelector(state => state.ui.previousTrack);

  const cardHandler = async () => {
    if (Object.keys(currentTrack).length !== 0) {
      analyticContentChange(props?.data, props?.type);
    }

    const reduxData = {
      ...props?.data,
      artwork: props?.data?.artwork?.includes('https')
        ? props?.data?.artwork
        : BaseURL + props?.data?.artwork,
      type: props?.type,
    };
    dispatch(updateCurrentTrack(reduxData));

    AppEventsLogger.logEvent('story_open', {
      tab: props?.type,
      sub_category_tab: props?.activeTab,
      card_type: 'standard',
      card_rank: props?.index,
      category: props?.type,
      subcategory: props?.data?.categories[0],
      title: props?.data.title,
      artist: props?.data.artist,
      language: availableLanguages[currentLanguage],
      id: props?.data.id,
    });

    AppEventsLogger.logEvent('story_play_start', {
      tab: props?.type,
      sub_category_tab: props?.activeTab,
      card_type: 'standard',
      card_rank: props?.index,
      category: props?.type,
      subcategory: props?.data?.categories[0],
      title: props?.data?.title,
      artist: props?.data.artist,
      language: availableLanguages[currentLanguage],
      id: props?.data.id,
    });

    analytics.trackEvent('content_card_select', {
      tab: props?.type,
      sub_category_tab: props?.activeTab,
      card_type: 'standard',
      card_rank: props?.index,
      category: props?.type,
      subcategory: props?.data?.categories[0],
      title: props?.data?.title,
      artist: props?.data.artist,
      language: availableLanguages[currentLanguage],
      id: props?.data.id,
    });

    TrackPlayer.stop();
    TrackPlayer.reset().then(() => playTrack(props?.data, props?.type));
  };
  const playTrack = async (data, type) => {
    handlePlayNewTrack(data, type);
    navigation.navigate('TrackPlayerScreen');

    analyticContentPlayHandler(data, type);
  };
  const analyticContentPlayHandler = (data, type) => {
    analytics.trackEvent('content_play', {
      action_source: 'card_select',
      category: type,
      subcategory: data?.categories[0],
      title: data?.title,
      artist: data?.artist,
      language: availableLanguages[currentLanguage],
      id: data?.id,
      current_time: '0:00',
      full_time: data?.duration,
    });
  };

  const analyticContentChange = (data, type) => {
    analytics.trackEvent('content_change', {
      action_source: 'trackchange',
      category: previousTrack?.type,
      subcategory: previousTrack?.categories
        ? previousTrack?.categories[0]
        : null,
      title: previousTrack?.title,
      artist: previousTrack?.artist,
      language: availableLanguages[currentLanguage],
      id: previousTrack?.id,
      current_time: formatPlayerTime(previousTrack?.position),
      full_time: previousTrack?.duration,
      new_category: type,
      new_subcategory: data?.categories[0],
      new_title: data?.title,
      new_full_time: data?.duration,
      new_language: availableLanguages[currentLanguage],
    });
  };
  return (
    <TouchableOpacity style={style.trackCardMainView} onPress={cardHandler}>
      <Tag
        fontSize={scaledValue(8)}
        tagColor={props?.tag?.color}
        tagName={props?.tag?.name}
        top={scaledValue(10)}
      />
      <View style={style.storyCardContainer}>
        <View style={style.trackCardImageView}>
          <Image
            imageStyle={style.imageStyle}
            style={style.trackCardImage}
            source={{
              uri: props?.artwork?.includes('https')
                ? props?.artwork
                : BaseURL + props?.artwork,
            }}
          />
        </View>
        <View style={style.trackCardInfoView}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={style.songName}>
            {props?.title}
          </Text>
          <View style={style.flex}>
            <Text style={style.songTitle}>{props?.artist}</Text>
          </View>
          <View>
            <Text style={style.timer}>{props?.duration}</Text>
          </View>

          {props?.deleteIcon && (
            <TouchableRipple
              style={style.deleteIconMain}
              rippleColor="rgba(3, 23, 76, 0.5)"
              onPress={props?.deletePress}>
              <Image source={props?.deleteIcon} style={style.deleteIcon} />
            </TouchableRipple>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default TrackCard;

const style = StyleSheet.create({
  trackCardMainView: {
    width: scaledValue(312),
    paddingTop: scaledValue(3.33),
    paddingBottom: scaledValue(3.28),
    paddingHorizontal: scaledValue(4.08),
    marginBottom: scaledValue(12),
    backgroundColor: '#1F265E',
    flexDirection: 'row',
    borderRadius: scaledValue(8),
    alignSelf: 'center',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Helvetica Neue',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: scaledValue(10),
    letterSpacing: scaledValue(0.05),
    color: '#98A1BD',
    overflow: 'visible',
  },
  descriptionBox: {
    width: scaledValue(325),
    paddingRight: 22,
    marginRight: 10,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timer: {
    fontFamily: 'Helvetica Neue',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: scaledValue(10),
    lineHeight: scaledValue(13),
    letterSpacing: scaledValue(0.8),
    color: '#98A0BD',
  },
  songName: {
    fontFamily: 'Helvetica Neue',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: scaledValue(14),
    letterSpacing: scaledValue(0.8),
    color: '#E6E7F2',
    width: scaledValue(168),
  },
  songTitle: {
    fontFamily: 'Helvetica Neue',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: scaledValue(10),
    letterSpacing: scaledValue(0.8),
    marginVertical: scaledValue(6),
    color: '#98A0BD',
    marginLeft: scaledValue(1),
  },

  songTime: {
    fontFamily: 'Helvetica Neue',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: scaledValue(10),
    lineHeight: scaledValue(10),
    letterSpacing: scaledValue(0.8),
    color: '#98A1BD',
  },
  trackCardImageView: {
    alignItems: 'center',
  },
  trackCardImage: {
    width: scaledValue(124.62),
    height: scaledValue(80.05),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaledValue(8),
  },
  trackCardInfoView: {
    paddingLeft: scaledValue(9.31),
    paddingVertical: scaledValue(14),
  },
  imageStyle: {
    borderRadius: scaledValue(8),
  },
  storyCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteIconMain: {
    position: 'absolute',
    right: scaledValue(15),
    bottom: scaledValue(8),
    padding: scaledValue(10),
  },
  deleteIcon: {
    width: scaledValue(11),
    height: scaledValue(13),
  },
});
