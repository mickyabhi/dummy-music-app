import React from 'react';
import {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import ProgressCircle from 'react-native-progress-circle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { handlePlayOrPause } from '~/utils/MediaPlayerUtils';

const SliderUI = () => {
  const { position, duration } = useProgress();
  const songState = usePlaybackState();

  return (
    <TouchableOpacity onPress={handlePlayOrPause}>
      <ProgressCircle
        percent={(position / duration) * 100}
        radius={20}
        borderWidth={2}
        color="#ffffff"
        shadowColor="#97A4C5"
        bgColor="#586894">
        {songState === State.Paused ? (
          <FontAwesome5 name="play" color="#FFFFFF" size={16} />
        ) : (
          <FontAwesome5 name="pause" color="#FFFFFF" size={16} />
        )}
      </ProgressCircle>
    </TouchableOpacity>
  );
};
export default SliderUI;
