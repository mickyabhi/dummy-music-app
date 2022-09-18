import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useProgress } from 'react-native-track-player';
import Svg, { Path } from 'react-native-svg';
import TrackPlayer from 'react-native-track-player';
import { analytics } from '~/utils/analytics';
import { useSelector } from 'react-redux';
import { formatPlayerTime } from '~/utils/common.utils';

export const SkipToBackButton = props => {
  const { position, duration } = useProgress();
  const currentTrack = useSelector(state => state.ui.currentTrack);

  const seekBackward = () => {
    if (TrackPlayer == null || position == null || position < 20) {
      return;
    }
    TrackPlayer.seekTo(position - 15);
    analytics.trackEvent('content_seekBackward', {
      action_source: 'trackplayer',
      category: currentTrack?.type,
      subcategory: currentTrack?.categories?.length
        ? currentTrack?.categories[0]
        : '',
      title: currentTrack?.title,
      artist: currentTrack?.artist,
      language: props?.language,
      id: currentTrack?.id,
      current_time: formatPlayerTime(position),
      full_time: formatPlayerTime(duration),
    });
  };

  return (
    <TouchableOpacity onPress={() => seekBackward()}>
      <Svg
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M11.8992 1.00424L8.32871 7.14666L14.513 10.693M3.98885 14.9909C3.56187 17.6509 4.06232 20.3759 5.40733 22.7149C6.75235 25.0539 8.86127 26.8664 11.3849 27.8525C13.9086 28.8386 16.6956 28.9391 19.2847 28.1374C21.8737 27.3356 24.1093 25.6797 25.6216 23.4437C27.1338 21.2078 27.8319 18.526 27.6002 15.8422C27.3685 13.1585 26.221 10.6338 24.3476 8.68622C22.4742 6.73861 19.9874 5.48486 17.2987 5.13255C14.6101 4.78024 11.881 5.35049 9.56314 6.7489"
          stroke="#E6E7F2"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M10.0695 15.6656C10.3575 15.6656 10.6375 15.6416 10.9095 15.5936C11.1815 15.5456 11.4255 15.4656 11.6415 15.3536C11.8655 15.2416 12.0535 15.0976 12.2055 14.9216C12.3655 14.7456 12.4695 14.5296 12.5175 14.2736H13.6335V22.6736H12.1335V16.7456H10.0695V15.6656ZM17.5775 14.2736H21.9215V15.4976H18.5975L18.1655 17.6336L18.1895 17.6576C18.3735 17.4496 18.6055 17.2936 18.8855 17.1896C19.1735 17.0776 19.4575 17.0216 19.7375 17.0216C20.1535 17.0216 20.5255 17.0936 20.8535 17.2376C21.1815 17.3736 21.4575 17.5696 21.6815 17.8256C21.9055 18.0736 22.0735 18.3696 22.1855 18.7136C22.3055 19.0576 22.3655 19.4296 22.3655 19.8296C22.3655 20.1656 22.3095 20.5136 22.1975 20.8736C22.0935 21.2256 21.9215 21.5496 21.6815 21.8456C21.4495 22.1336 21.1495 22.3736 20.7815 22.5656C20.4135 22.7496 19.9735 22.8416 19.4615 22.8416C19.0535 22.8416 18.6735 22.7856 18.3215 22.6736C17.9775 22.5696 17.6735 22.4096 17.4095 22.1936C17.1455 21.9776 16.9335 21.7136 16.7735 21.4016C16.6215 21.0816 16.5375 20.7096 16.5215 20.2856H17.8895C17.9295 20.7416 18.0855 21.0936 18.3575 21.3416C18.6295 21.5816 18.9895 21.7016 19.4375 21.7016C19.7255 21.7016 19.9695 21.6536 20.1695 21.5576C20.3695 21.4616 20.5295 21.3296 20.6495 21.1616C20.7775 20.9936 20.8655 20.7976 20.9135 20.5736C20.9695 20.3496 20.9975 20.1096 20.9975 19.8536C20.9975 19.6216 20.9655 19.4016 20.9015 19.1936C20.8375 18.9776 20.7415 18.7896 20.6135 18.6296C20.4855 18.4696 20.3175 18.3416 20.1095 18.2456C19.9095 18.1496 19.6735 18.1016 19.4015 18.1016C19.1135 18.1016 18.8415 18.1576 18.5855 18.2696C18.3375 18.3736 18.1575 18.5736 18.0455 18.8696H16.6775L17.5775 14.2736Z"
          fill="#E6E7F2"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export const SkipToNextButton = props => {
  const { position, duration } = useProgress();
  const currentTrack = useSelector(state => state.ui.currentTrack);

  const seekForward = () => {
    if (TrackPlayer == null || position == null || duration - position < 20) {
      return;
    }
    TrackPlayer.seekTo(position + 15);
    analytics.trackEvent('content_seekForward', {
      action_source: 'trackplayer',
      category: currentTrack?.type,
      subcategory: currentTrack?.categories?.length
        ? currentTrack?.categories[0]
        : '',
      title: currentTrack?.title,
      artist: currentTrack?.artist,
      language: props?.language,
      id: currentTrack?.id,
      current_time: formatPlayerTime(position),
      full_time: formatPlayerTime(duration),
    });
  };

  return (
    <TouchableOpacity onPress={() => seekForward()}>
      <Svg
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/Svg">
        <Path
          d="M20.1008 1.00424L23.6713 7.14666L17.487 10.693M28.0112 14.9909C28.4381 17.6509 27.9377 20.3759 26.5927 22.7149C25.2477 25.0539 23.1387 26.8664 20.6151 27.8525C18.0914 28.8386 15.3044 28.9391 12.7153 28.1374C10.1263 27.3356 7.89065 25.6797 6.37843 23.4437C4.86621 21.2078 4.16815 18.526 4.39982 15.8422C4.6315 13.1585 5.77901 10.6338 7.65238 8.68622C9.52575 6.73861 12.0126 5.48486 14.7013 5.13255C17.3899 4.78024 20.119 5.35049 22.4369 6.7489"
          stroke="#E6E7F2"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M10.0695 15.6656C10.3575 15.6656 10.6375 15.6416 10.9095 15.5936C11.1815 15.5456 11.4255 15.4656 11.6415 15.3536C11.8655 15.2416 12.0535 15.0976 12.2055 14.9216C12.3655 14.7456 12.4695 14.5296 12.5175 14.2736H13.6335V22.6736H12.1335V16.7456H10.0695V15.6656ZM17.5775 14.2736H21.9215V15.4976H18.5975L18.1655 17.6336L18.1895 17.6576C18.3735 17.4496 18.6055 17.2936 18.8855 17.1896C19.1735 17.0776 19.4575 17.0216 19.7375 17.0216C20.1535 17.0216 20.5255 17.0936 20.8535 17.2376C21.1815 17.3736 21.4575 17.5696 21.6815 17.8256C21.9055 18.0736 22.0735 18.3696 22.1855 18.7136C22.3055 19.0576 22.3655 19.4296 22.3655 19.8296C22.3655 20.1656 22.3095 20.5136 22.1975 20.8736C22.0935 21.2256 21.9215 21.5496 21.6815 21.8456C21.4495 22.1336 21.1495 22.3736 20.7815 22.5656C20.4135 22.7496 19.9735 22.8416 19.4615 22.8416C19.0535 22.8416 18.6735 22.7856 18.3215 22.6736C17.9775 22.5696 17.6735 22.4096 17.4095 22.1936C17.1455 21.9776 16.9335 21.7136 16.7735 21.4016C16.6215 21.0816 16.5375 20.7096 16.5215 20.2856H17.8895C17.9295 20.7416 18.0855 21.0936 18.3575 21.3416C18.6295 21.5816 18.9895 21.7016 19.4375 21.7016C19.7255 21.7016 19.9695 21.6536 20.1695 21.5576C20.3695 21.4616 20.5295 21.3296 20.6495 21.1616C20.7775 20.9936 20.8655 20.7976 20.9135 20.5736C20.9695 20.3496 20.9975 20.1096 20.9975 19.8536C20.9975 19.6216 20.9655 19.4016 20.9015 19.1936C20.8375 18.9776 20.7415 18.7896 20.6135 18.6296C20.4855 18.4696 20.3175 18.3416 20.1095 18.2456C19.9095 18.1496 19.6735 18.1016 19.4015 18.1016C19.1135 18.1016 18.8415 18.1576 18.5855 18.2696C18.3375 18.3736 18.1575 18.5736 18.0455 18.8696H16.6775L17.5775 14.2736Z"
          fill="#E6E7F2"
        />
      </Svg>
    </TouchableOpacity>
  );
};
