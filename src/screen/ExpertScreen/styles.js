import { StyleSheet } from 'react-native';
import { FONTS } from '~/constants';
import { scaledValue } from '~/utils/design.utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  boldText: {
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    fontSize: scaledValue(16),
    color: '#fff',
    marginTop: scaledValue(12),
    textAlign: 'center',
  },
  text: {
    fontSize: scaledValue(14),
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: scaledValue(6),
    lineHeight: scaledValue(22),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    width: scaledValue(232),
  },
  imageStyles: {
    width: scaledValue(73),
    height: scaledValue(56.22),
    marginTop: scaledValue(45),
  },
  smallText: {
    fontSize: scaledValue(12),
    color: '#CDCDCD',
    marginTop: scaledValue(20),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
});
