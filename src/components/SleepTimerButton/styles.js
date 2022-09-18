import { StyleSheet } from 'react-native';
import { FONTS } from '~/constants';
import { scaledValue } from '~/utils/design.utils';
export const styles = StyleSheet.create({
  sleepTimerButtonView: {
    width: scaledValue(360),
    position: 'absolute',
    bottom: 0,
    height: scaledValue(56),
    borderTopWidth: scaledValue(0.5),
    flexDirection: 'row',
    borderTopLeftRadius: scaledValue(18),
    borderTopRightRadius: scaledValue(18),
  },
  sleepTimerActiveButtonView: {
    width: scaledValue(360),
    position: 'absolute',
    bottom: 0,
    height: scaledValue(56),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: scaledValue(12),
  },
  sleepTimerText: {
    color: '#fff',
    fontSize: scaledValue(12),
    letterSpacing: scaledValue(0.8),
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
  },
  buttonText: {
    fontSize: scaledValue(10),
  },
  deleteEditButton: {
    flexDirection: 'row',
  },
  onText: {
    color: '#F8E71C',
  },
  sleepTimeIconTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editSleepTimerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: scaledValue(360),
    height: scaledValue(56),
    justifyContent: 'center',
  },
  clockIcon: {
    marginLeft: scaledValue(118),
  },
});
