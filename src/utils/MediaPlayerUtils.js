import TrackPlayer, {
  State,
  Capability as TrackPlayerCapability,
} from 'react-native-track-player';
import { BaseURL } from '../constants';
import { getItemFromAsyncStorage } from '~/storage';
import { ToastAndroid } from 'react-native';

export const initializeTrackPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: false,
      waitForBuffer: true,
      alwaysPauseOnInterruption: true,
      capabilities: [
        TrackPlayerCapability.Play,
        TrackPlayerCapability.Pause,
        TrackPlayerCapability.Stop,
      ],
      compactCapabilities: [
        TrackPlayerCapability.Play,
        TrackPlayerCapability.Pause,
        TrackPlayerCapability.Stop,
      ],
    });
  } catch (error) {
    return ToastAndroid.show(
      'Failed to initiate TrackPlayer',
      ToastAndroid.SHORT,
    );
  }
};

export const handlePlayOrPause = async () => {
  const state = await TrackPlayer.getState();

  if (state === State.Playing) {
    await TrackPlayer.pause();
  } else if (state === State.Paused) {
    await TrackPlayer.play();
  }
  return state;
};

export const handleStop = async () => {
  const state = await TrackPlayer.getState();

  if (state === State.Playing) {
    await TrackPlayer.stop();
  }
};

export const handlePlayerReset = async currentTrack => {
  await TrackPlayer.stop();
  await TrackPlayer.reset();
  await TrackPlayer.add([
    {
      ...currentTrack,
      url: currentTrack.url.includes('https')
        ? currentTrack.url
        : BaseURL + currentTrack.url,
    },
  ]);
  await TrackPlayer.play();
};

export const handlePlayNewTrack = async (track, mediaType) => {
  const key = `${track.title}-${mediaType}`;
  const lastTimePlayedTrack = await getItemFromAsyncStorage(key);
  let lastTimePlayedTrackObj;
  if (lastTimePlayedTrack !== '') {
    lastTimePlayedTrackObj = JSON.parse(lastTimePlayedTrack);
    await TrackPlayer.add({
      ...track,
      url: track?.url?.includes('https') ? track.url : BaseURL + track.url,
      artwork: BaseURL + track.artwork,
    }).then(() => {
      if (
        lastTimePlayedTrackObj.currentTrack === track.title &&
        lastTimePlayedTrackObj.position
      ) {
        TrackPlayer.seekTo(parseInt(lastTimePlayedTrackObj?.position)).then(
          async () => {
            await TrackPlayer.play();
          },
        );
      }
    });
  } else {
    await TrackPlayer.add({
      ...track,
      url: track?.url?.includes('https') ? track.url : BaseURL + track.url,
      artwork: BaseURL + track.artwork,
    }).then(async () => {
      await TrackPlayer.play();
    });
  }
};
