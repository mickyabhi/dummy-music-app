import { StyleSheet } from 'react-native';
import { FONTS } from '~/constants';
import { scaledValue } from '~/utils/design.utils';
export const styles = StyleSheet.create({
  sleepTimerMainView: {
    flex: 1,
    backgroundColor: '#0B173C',
    padding: scaledValue(26),
  },
  stopAudioText: {
    color: '#fff',
    fontSize: scaledValue(16),
    marginBottom: scaledValue(27),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  textButtonView: {
    flex: 1,
    padding: scaledValue(24),
  },
  radioButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaledValue(27),
  },
  radioButtonTitle: {
    fontSize: scaledValue(14),
    color: '#fff',
    marginLeft: scaledValue(31),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  timerOffButton: {
    width: scaledValue(360),
    height: scaledValue(57),
    borderTopColor: '#232E4F',
    borderTopWidth: scaledValue(0.5),
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  turnOffTimerText: {
    color: '#fff',
    fontSize: scaledValue(16),
  },
});
