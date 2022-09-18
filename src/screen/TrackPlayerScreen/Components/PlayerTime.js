import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useProgress } from 'react-native-track-player';
import { formatPlayerTime } from '~/utils/common.utils';
import { scaledValue } from '~/utils/design.utils';

const PlayerTime = () => {
  const { position, duration } = useProgress();

  return (
    <View style={style.timerView}>
      <Text style={{ ...style.timeText, flex: 1 }}>
        {position <= duration
          ? position <= 0
            ? '0:00'
            : formatPlayerTime(position)
          : formatPlayerTime(duration)}
      </Text>
      <Text style={style.timeText}>{formatPlayerTime(duration)}</Text>
    </View>
  );
};
export default PlayerTime;
const style = StyleSheet.create({
  timeText: {
    fontFamily: 'Helvetica Neue',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 40,
    letterSpacing: 3,
    color: '#E6E7F2',
  },
  timerView: { width: scaledValue(303), flexDirection: 'row' },
});
