import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { State, usePlaybackState } from 'react-native-track-player';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { analytics } from '~/utils/analytics';
import { handlePlayerReset, handlePlayOrPause } from '~/utils/MediaPlayerUtils';
import { useSelector } from 'react-redux';
import { useProgress } from 'react-native-track-player';
import { formatPlayerTime } from '~/utils/common.utils';
import { scaledValue } from '~/utils/design.utils';

const PlayPauseButton = props => {
  const { position } = useProgress();
  const currentTrack = useSelector(state => state.ui.currentTrack);
  const songState = usePlaybackState();
  const languagePref = useSelector(state => state.ui.currentLanguage);
  const availableLanguages = useSelector(state => state.ui.availableLanguages);

  const analyticPlayHandler = actionSource => {
    analytics.trackEvent('content_play', {
      action_source: actionSource,
      category: currentTrack?.type,
      subcategory: currentTrack?.categories?.length
        ? currentTrack?.categories[0]
        : '',
      title: currentTrack?.title,
      artist: currentTrack?.artist,
      language: availableLanguages[languagePref],
      id: currentTrack?.id,
      current_time: formatPlayerTime(position),
      full_time: currentTrack?.duration,
    });
  };

  const analyticPauseHandler = actionSource => {
    analytics.trackEvent('content_pause', {
      action_source: actionSource,
      category: currentTrack?.type,
      subcategory: currentTrack?.categories?.length
        ? currentTrack?.categories[0]
        : '',
      title: currentTrack?.title,
      artist: currentTrack?.artist,
      language: availableLanguages[languagePref],
      id: currentTrack?.id,
      current_time: formatPlayerTime(position),
      full_time: currentTrack?.duration,
    });
  };

  const style = StyleSheet.create({
    playPauseCircleView: {
      backgroundColor: '#C0CBFB',
      width: props.hw + 15,
      height: props.hw + 15,
      borderRadius: 70,
      alignItems: 'center',
      justifyContent: 'center',
    },
    playPauseView: {
      backgroundColor: '#E6E7F2',
      width: props.hw,
      height: props.hw,
      borderRadius: 65,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const handlePlayPause = () => {
    if (!props?.showReset) {
      if (songState === State.Playing || songState === State.Paused) {
        handlePlayOrPause();
        if (songState === State.Playing) {
          analyticPauseHandler('app_fullplayer');
        }

        if (songState === State.Paused) {
          analyticPlayHandler('app_fullplayer');
        }
      }
    }
    if (props?.showReset) {
      handlePlayerReset(currentTrack);
    }
  };

  return (
    <TouchableOpacity
      style={style.playPauseCircleView}
      onPress={handlePlayPause}>
      <View style={style.playPauseView}>
        {props?.showReset && (
          <MaterialCommunityIcons
            name="reload"
            color="#937DE2"
            size={scaledValue(36)}
          />
        )}
        {songState === State.Paused
          ? !props?.showReset && (
              <FontAwesome5 name="play" color="#937DE2" size={props.size} />
            )
          : !props?.showReset && (
              <FontAwesome5 name="pause" color="#937DE2" size={props.size} />
            )}
      </View>
    </TouchableOpacity>
  );
};

export default PlayPauseButton;
