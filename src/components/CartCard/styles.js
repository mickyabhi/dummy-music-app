import { StyleSheet } from 'react-native';
import { FONTS } from '~/constants';
import { scaledValue } from '~/utils/design.utils';

export const styles = StyleSheet.create({
  mainView: {
    marginRight: scaledValue(24),
    marginBottom: scaledValue(65.94),
  },
  productImg: {
    width: scaledValue(139.17),
    height: scaledValue(100.57),
  },
  productName: {
    width: scaledValue(135),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontSize: scaledValue(14),
    letterSpacing: scaledValue(1),
    lineHeight: scaledValue(20),
    color: '#ffffff',
    marginTop: scaledValue(8),
    marginBottom: scaledValue(5),
  },
  priceView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  compareAtPrice: {
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    fontSize: scaledValue(12),
    lineHeight: scaledValue(20),
    textDecorationLine: 'line-through',
    color: '#937DE2',
    marginRight: scaledValue(18),
  },
  productPrice: {
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    fontSize: scaledValue(12),
    lineHeight: scaledValue(20),
    color: 'rgba(152, 160, 189, 1)',
  },
});
