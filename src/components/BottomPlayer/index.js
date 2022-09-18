import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AboutSong from '~/screen/TrackPlayerScreen/Components/AboutSong';
import { IconButton } from 'react-native-paper';
import ProgressBar from '~/screen/TrackPlayerScreen/Components/Slider';
import { useNavigation } from '@react-navigation/native';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import { analytics } from '~/utils/analytics';
import { formatPlayerTime } from '~/utils/common.utils';
import { useSelector } from 'react-redux';
import { scaledValue } from '~/utils/design.utils';
import crossIcon from '~assets/images/playerBarCross.png';

const BottomPlayer = props => {
  const { position } = useProgress();
  const navigation = useNavigation();
  const currentTrack = useSelector(state => state.ui.currentTrack);
  const songState = usePlaybackState();
  const languagePref = useSelector(state => state.ui.currentLanguage);
  const availableLanguages = useSelector(state => state.ui.availableLanguages);

  const analyticsContentCloseHandler = () => {
    analytics.trackEvent('content_close', {
      action_source: 'app_bottomplayer',
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
  return (
    <>
      {props?.isVisible && (
        <TouchableOpacity
          style={styles.playerBar}
          onPress={() => navigation.navigate('TrackPlayerScreen')}>
          <AboutSong />
          <View style={styles.progressBarView}>
            <TouchableOpacity
              onPress={() => {
                if (songState === State.Playing) {
                  analyticPauseHandler('app_bottomplayer');
                }
                if (songState === State.Paused) {
                  analyticPlayHandler('app_bottomplayer');
                }
              }}>
              <ProgressBar />
            </TouchableOpacity>
            {songState === State.Paused && (
              <IconButton
                style={styles.crossButton}
                icon={crossIcon}
                color="#97A4C5"
                size={scaledValue(16)}
                onPress={() => {
                  TrackPlayer.stop();
                  analyticsContentCloseHandler();
                }}
              />
            )}
            {songState !== State.Paused && <View style={styles.emptyView} />}
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default BottomPlayer;

const styles = StyleSheet.create({
  playerBar: {
    zIndex: 1,
    backgroundColor: '#586894',
    marginBottom: scaledValue(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaledValue(18),
    paddingVertical: scaledValue(12),
    borderTopWidth: scaledValue(1),
    borderTopColor: '#213463',
    width: scaledValue(326),
    height: scaledValue(54),
    marginHorizontal: scaledValue(16),
    borderRadius: scaledValue(8),
    position: 'absolute',
    bottom: scaledValue(58),
  },
  progressBarView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crossButton: {
    marginLeft: scaledValue(8),
  },
  emptyView: {
    width: scaledValue(38),
  },
});
