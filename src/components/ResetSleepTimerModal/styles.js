import { StyleSheet } from 'react-native';
import { FONTS } from '~/constants';
import { scaledValue } from '~/utils/design.utils';

export const styles = StyleSheet.create({
  containerStyles: {
    backgroundColor: '#0B173C',
    position: 'absolute',
    bottom: 0,
    width: scaledValue(360),
    height: scaledValue(283),
    alignItems: 'center',
  },
  buttonsView: {
    flexDirection: 'row',
    width: scaledValue(278),
    justifyContent: 'space-between',
    position: 'absolute',
    top: scaledValue(209),
  },
  resetTimerText: {
    color: '#fff',
    fontSize: scaledValue(16),
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    position: 'absolute',
    top: scaledValue(35),
  },
  timerText: {
    color: '#fff',
    fontSize: scaledValue(12),
    position: 'absolute',
    top: scaledValue(71),
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
  },
  sliderStyle: {
    width: scaledValue(300),
    position: 'absolute',
    top: scaledValue(112.82),
  },
  radioText: {
    color: '#fff',
    fontSize: scaledValue(12),
    justifyContent: 'center',
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  setAsDefaultView: {
    position: 'absolute',
    top: scaledValue(161),
    flexDirection: 'row',
    alignItems: 'center',
  },
  errText: {
    color: '#FF0000',
    marginTop: scaledValue(23),
    fontSize: scaledValue(10),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
});
