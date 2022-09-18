import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BaseURL } from '~/constants';
import TrackPlayer from 'react-native-track-player';
import { scaledValue } from '~/utils/design.utils';
import { analytics } from '~/utils/analytics';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentTrack } from '~/store/UiSlice';
import { handlePlayNewTrack } from '~/utils/MediaPlayerUtils';
import { formatPlayerTime } from '~/utils/common.utils';
import Tag from '~/components/Tag';

const MusicCard = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.ui.currentLanguage);
  const availableLanguages = useSelector(state => state.ui.availableLanguages);
  const currentTrack = useSelector(state => state.ui.currentTrack);
  const previousTrack = useSelector(state => state.ui.previousTrack);

  const dispatchCaller = () => {
    if (Object.keys(currentTrack).length !== 0) {
      analyticContentChange(props.data);
    }
    const reduxData = {
      ...props?.data,
      artwork: BaseURL + props?.data.artwork,
      type: props.type,
    };
    dispatch(updateCurrentTrack(reduxData));

    analytics.trackEvent('content_card_select', {
      tab: props?.type,
      sub_category_tab: props?.currentTab,
      card_type: 'standard',
      card_rank: props?.index + 1,
      category: props?.type,
      subcategory: props?.data?.categories[0],
      title: props?.data?.title,
      language: availableLanguages[currentLanguage],
      id: props?.data?.id,
    });

    TrackPlayer.stop();
    TrackPlayer.reset().then(() => playTrack());
  };

  const playTrack = async () => {
    handlePlayNewTrack(props?.data, props.type);
    navigation.navigate('TrackPlayerScreen', {
      subcategory: props?.currentTab,
    });
    analyticContentPlayHandler(props?.data);
  };

  const analyticContentPlayHandler = data => {
    analytics.trackEvent('content_play', {
      action_source: 'card_select',
      category: props?.type,
      subcategory: props?.data?.categories[0],
      title: data?.title,
      language: availableLanguages[currentLanguage],
      id: data?.id,
      current_time: '0:00',
      full_time: data?.duration,
    });
  };

  const analyticContentChange = data => {
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
      new_category: props?.type,
      new_subcategory: data?.categories[0],
      new_title: data?.title,
      new_full_time: data?.duration,
      new_language: availableLanguages[currentLanguage],
    });
  };

  return (
    <TouchableOpacity style={style.musicCard} onPress={dispatchCaller}>
      <Tag
        fontSize={scaledValue(8)}
        tagColor={props?.tag?.color}
        tagName={props?.tag?.name}
        top={scaledValue(10)}
      />
      <View style={style.musicCardView}>
        <FastImage
          imageStyle={style.imageBackgroundStyle}
          style={style.musicCardImage}
          source={{ uri: BaseURL + props?.data.artwork }}
        />
        <View style={style.titleView}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={style.SongName}>
            {props?.data.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MusicCard;
const style = StyleSheet.create({
  musicCard: {
    width: scaledValue(148),
    padding: scaledValue(6),
    marginBottom: scaledValue(10),
    backgroundColor: '#1F265E',
    borderRadius: scaledValue(8),
    elevation: scaledValue(10),
    marginHorizontal: scaledValue(14),
    marginRight: scaledValue(0),
  },
  SongName: {
    fontFamily: 'Helvetica Neue',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.8,
    color: '#E6E7F2',
    marginTop: 6,
  },
  musicCardImage: {
    width: '100%',
    height: 136,
    alignItems: 'center',
    justifyContent: 'center',
  },
  musicCardView: {
    justifyContent: 'center',
    width: '100%',
  },
  titleView: {
    flex: 1,
  },
  imageBackgroundStyle: {
    borderRadius: 8,
  },
});
