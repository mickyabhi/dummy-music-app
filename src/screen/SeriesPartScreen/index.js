import {
  FlatList,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import BackNavigationButton from '~/components/BackNavigationButton';
import { scaledValue } from '~/utils/design.utils';
import { BaseURL, FONTS } from '~/constants';
import SeriesCard from '~/components/SeriesCard';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updateCurrentTrack } from '~/store/UiSlice';
import TrackPlayer from 'react-native-track-player';
import { handlePlayNewTrack } from '~/utils/MediaPlayerUtils';

const SeriesPartScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const params = props?.route?.params;

  const seriesCardHandler = item => {
    const reduxData = {
      ...item,
      artwork: item?.artwork?.includes('https')
        ? item?.artwork
        : BaseURL + item?.artwork,
      type: 'story',
    };

    dispatch(updateCurrentTrack(reduxData));
    TrackPlayer.stop();
    TrackPlayer.reset().then(() => playTrack(item, 'story'));
  };

  const playTrack = async (data, type) => {
    handlePlayNewTrack(data, type);
    navigation.navigate('TrackPlayerScreen');
  };

  return (
    <View style={styles.musicPlayerView}>
      <StatusBar backgroundColor="#0B173C" />
      <ImageBackground
        resizeMode="stretch"
        style={styles.trackCoverImg}
        source={{
          uri: BaseURL + params?.seriesArtwork,
        }}>
        <FastImage
          style={styles.lineargradientImage}
          source={require('../../../assets/images/lineargradient.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
      </ImageBackground>
      <View style={styles.backNavigationView}>
        <BackNavigationButton
          title="back"
          size={24}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.musicPlayerMainView}>
        <Text style={styles.seriesName}>{params?.seriesTitle}</Text>
        <Text style={styles.artistName}>
          {`${params?.artist}` ? `by ${params?.artist}` : null}
        </Text>
        <Text style={styles.description}>{params?.description}</Text>
      </View>
      <View style={styles.seriesCardView}>
        <FlatList
          data={params?.seriesParts}
          numColumns={2}
          initialNumToRender={8}
          renderItem={({ item, index }) => (
            <SeriesCard
              seriesTitle={item?.title}
              mins={item?.duration}
              artwork={item?.artwork}
              marginRight={scaledValue(19)}
              onPress={() => seriesCardHandler(item)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default SeriesPartScreen;

const styles = StyleSheet.create({
  musicPlayerView: {
    flex: 1,
    backgroundColor: '#0B173C',
  },
  trackCoverImg: {
    width: scaledValue(360),
    height: scaledValue(202),
  },
  lineargradientImage: {
    flex: 1,
  },
  backNavigationView: {
    position: 'absolute',
    top: scaledValue(24),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaledValue(24),
  },
  musicPlayerMainView: {
    alignItems: 'center',
    marginBottom: scaledValue(34.67),
  },
  seriesName: {
    fontSize: scaledValue(18),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    letterSpacing: scaledValue(0.32),
  },
  artistName: {
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontSize: scaledValue(12),
    color: '#D3D3D3',
    marginTop: scaledValue(10),
  },
  description: {
    fontSize: scaledValue(12),
    lineHeight: scaledValue(18),
    textAlign: 'center',
    color: 'rgba(151, 164, 197, 1)',
    width: scaledValue(270),
    marginTop: scaledValue(14),
  },
  seriesCardView: {
    flex: 1,
    marginHorizontal: scaledValue(39),
  },
});
