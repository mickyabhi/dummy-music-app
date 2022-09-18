import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { scaledValue } from '~/utils/design.utils';
import Video from 'react-native-video';
import { BaseURL } from '~/constants';
import circle from '../../../assets/images/grayCircle.png';
import Slider from '@react-native-community/slider';
const ProductBanner = props => {
  const [durationTime, setDurationTime] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [showPlayIcon, setShowPlayIcon] = useState(true);

  useEffect(() => {
    if (props.isPause) {
      setShowPlayIcon(true);
    } else {
      setTimeout(() => {
        setShowPlayIcon(false);
      }, 1500);
    }
  }, [props.isPause]);

  return (
    <View style={styles.container}>
      {props?.type === 'image' && (
        <Image source={{ uri: BaseURL + props?.img }} style={styles.banner} />
      )}
      {props?.type !== 'image' && (
        <TouchableOpacity onPress={props.toggle}>
          <Video
            audioOnly={props?.type === 'imageAudio'}
            style={styles.banner}
            source={{
              uri: BaseURL + props?.url,
            }}
            poster={BaseURL + props?.img}
            paused={props?.isPause}
            onLoad={({ duration }) => setDurationTime(duration)}
            onProgress={({ currentTime }) => setCurrentPosition(currentTime)}
          />
          {props?.playPauseControlIcon && showPlayIcon && (
            <Image
              style={styles.playPauseIcon}
              source={props.playPauseControlIcon}
            />
          )}

          {props?.playPauseControlIcon && showPlayIcon && (
            <Image style={styles.overlay} source={circle} />
          )}
        </TouchableOpacity>
      )}
      <Slider
        style={styles.slider}
        minimumTrackImage={0}
        maximumValue={durationTime}
        maximumTrackTintColor="transparent"
        thumbTintColor="transparent"
        minimumTrackTintColor="#F5F5F5"
        value={currentPosition}
      />
    </View>
  );
};

export default ProductBanner;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaledValue(24),
  },
  slider: {
    position: 'absolute',
    bottom: -6,
    width: scaledValue(330),
    marginLeft: scaledValue(15),
  },
  banner: {
    width: scaledValue(312),
    height: scaledValue(231),
    borderRadius: scaledValue(8),
  },
  muteIcon: {
    position: 'absolute',
    left: scaledValue(144),
    top: scaledValue(112.18),
    width: scaledValue(17),
    height: scaledValue(17),
    zIndex: 1,
  },
  playPauseIcon: {
    position: 'absolute',
    left: scaledValue(141),
    top: scaledValue(109.16),
    width: scaledValue(24),
    height: scaledValue(24),
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    left: scaledValue(132),
    top: scaledValue(100),
    width: scaledValue(42),
    height: scaledValue(42),
  },
});
