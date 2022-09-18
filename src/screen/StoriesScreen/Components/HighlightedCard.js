import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { scaledValue } from '~/utils/design.utils';
import { style } from '../../AppScreens/style';
import Tag from '../../../components/Tag';
import { BaseURL } from '~/constants';
import { updateCurrentTrack } from '~/store/UiSlice';
import { analytics } from '~/utils/analytics';
import { formatPlayerTime } from '~/utils/common.utils';
import { handlePlayNewTrack } from '~/utils/MediaPlayerUtils';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppEventsLogger } from 'react-native-fbsdk-next';
import TrackPlayer from 'react-native-track-player';

const HighlightedCard = props => {
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
    <View style={style.card}>
      <TouchableOpacity style={style.View} onPress={cardHandler}>
        <View style={style.bgImageView}>
          <Image
            imageStyle={{ borderRadius: scaledValue(8) }}
            style={{
              ...style.bgImage,
            }}
            source={{ uri: BaseURL + props?.artwork }}
          />
        </View>
        <View style={style.songDetailsView}>
          <Text style={style.SongName}>{props?.title}</Text>
          <View style={style.artistNameView}>
            <View style={style.artistView}>
              <Text style={style.songArtist}>{props?.artist}</Text>
            </View>
            <View style={style.durationView}>
              <Text style={style.songDuration}>{props?.duration}</Text>
            </View>
          </View>
        </View>
        <Tag
          fontSize={scaledValue(10)}
          tagColor={props?.tag?.color}
          tagName={props?.tag?.name}
          top={scaledValue(11)}
        />
      </TouchableOpacity>
    </View>
  );
};
export default HighlightedCard;
