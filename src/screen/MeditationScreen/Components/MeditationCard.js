import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { BaseURL } from '~/constants';
import { updateCurrentTrack } from '~/store/UiSlice';
import { handlePlayNewTrack } from '~/utils/MediaPlayerUtils';
import { scaledValue } from '~/utils/design.utils';
import { analytics } from '~/utils/analytics';
import { formatPlayerTime } from '~/utils/common.utils';

const MeditationCard = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentTrack = useSelector(state => state.ui.currentTrack);
  const previousTrack = useSelector(state => state.ui.previousTrack);

  const dispatchCaller = () => {
    if (Object.keys(currentTrack).length !== 0) {
      analyticContentChange(props.data);
    }
    const reduxData = {
      ...props?.data,
      artwork: BaseURL + props?.data?.artwork,
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
      artist: props?.data?.artist,
      language: props?.language,
      id: props?.data?.id,
    });

    TrackPlayer.stop();
    TrackPlayer.reset().then(() => playTrack());
  };

  const playTrack = async () => {
    handlePlayNewTrack(props?.data, props?.type);
    navigation.navigate('TrackPlayerScreen', {
      screen: 'Meditation',
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
      artist: data?.artist,
      language: props?.language,
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
      language: props?.language,
      id: previousTrack?.id,
      current_time: formatPlayerTime(previousTrack?.position),
      full_time: previousTrack?.duration,
      new_category: props?.type,
      new_subcategory: data?.categories[0],
      new_title: data?.title,
      new_full_time: data?.duration,
      new_language: props?.language,
    });
  };

  return (
    <TouchableOpacity style={style.trackCardMainView} onPress={dispatchCaller}>
      <View style={style.trackCardImageView}>
        <ImageBackground
          imageStyle={style.imageStyle}
          style={style.trackCardImage}
          source={{ uri: BaseURL + props?.data?.artwork }}
        />
      </View>
      <View style={style.trackCardInfoView}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={style.songName}>
          {props?.data?.title}
        </Text>
        <View style={style.flex}>
          <Text style={style.songTitle}>{props?.data?.artist}</Text>
        </View>
        <View>
          <Text style={style.Timer}>{props?.data?.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default MeditationCard;

const style = StyleSheet.create({
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
  trackCardMainView: {
    width: scaledValue(312),
    paddingTop: scaledValue(3.33),
    paddingHorizontal: scaledValue(4.08),
    paddingBottom: scaledValue(3.28),
    marginBottom: scaledValue(12),
    backgroundColor: '#1F265E',
    flexDirection: 'row',
    borderRadius: scaledValue(8),
    alignSelf: 'center',
    textAlign: 'center',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Tick: {
    margin: scaledValue(2),
    marginLeft: scaledValue(5),
    width: scaledValue(15),
    height: scaledValue(15),
    marginTop: scaledValue(5),
  },
  Timer: {
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
    justifyContent: 'center',
  },
  trackCardImage: {
    width: scaledValue(124.62),
    height: scaledValue(80.05),
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackCardInfoView: {
    paddingLeft: scaledValue(9.31),
    paddingVertical: scaledValue(14),
  },
  imageStyle: {
    borderRadius: scaledValue(8),
  },
});
