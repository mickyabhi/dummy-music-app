import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FONTS } from '~/constants';
import { scaledValue } from '~/utils/design.utils';

const AboutSong = props => {
  const currentTrack = useSelector(state => state.ui.currentTrack);

  if (props.screen === 'TrackPlayerScreen') {
    return (
      <>
        <Text style={style.textLabel}>
          {currentTrack ? currentTrack?.title : 'Song Name'}
        </Text>

        {currentTrack &&
          currentTrack?.artist &&
          currentTrack?.artist?.trim() !== '' && (
            <Text style={style.artistNameText}>By {currentTrack?.artist}</Text>
          )}
      </>
    );
  } else {
    return (
      <View>
        <Text style={style.nowPlayingText}>Now Playing</Text>
        <Text style={style.songNameText} ellipsizeMode="tail" numberOfLines={1}>
          {currentTrack ? currentTrack?.title : 'Song Name'}
        </Text>
      </View>
    );
  }
};
export default AboutSong;
const style = StyleSheet.create({
  textLabel: {
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    fontSize: scaledValue(18),
    letterSpacing: scaledValue(0.2),
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: scaledValue(24),
  },
  artistNameText: {
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontSize: scaledValue(12),
    color: '#D3D3D3',
    marginTop: scaledValue(10),
  },
  nowPlayingText: {
    fontSize: scaledValue(10),
    lineHeight: scaledValue(14),
    letterSpacing: scaledValue(0.5),
    color: '#97A4C5',
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
  },
  songNameText: {
    fontSize: scaledValue(14),
    lineHeight: scaledValue(19.07),
    letterSpacing: scaledValue(0.5),
    color: '#FFFFFF',
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    width: scaledValue(170),
  },
});
