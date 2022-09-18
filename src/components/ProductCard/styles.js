import { StyleSheet } from 'react-native';
import { FONTS } from '~/constants';
import { scaledValue } from '~/utils/design.utils';

export const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: scaledValue(36),
    height: scaledValue(337),
    marginHorizontal: scaledValue(24),
    width: scaledValue(310),
  },
  productImage: {
    width: scaledValue(310),
    height: scaledValue(228),
    marginBottom: scaledValue(18),
  },
  titleText: {
    color: '#fff',
    fontSize: scaledValue(14),
    width: scaledValue(297),
    letterSpacing: scaledValue(1),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    lineHeight: scaledValue(24),
  },
  productDetailView: {
    justifyContent: 'center',
  },
  priceText: {
    color: '#937DE2',
    fontSize: scaledValue(12),
    textAlign: 'center',
    marginRight: scaledValue(8),
    textDecorationLine: 'line-through',
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  minimumPriceText: {
    color: '#fff',
    fontSize: scaledValue(12),
    marginRight: scaledValue(8),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  mrpView: {
    flexDirection: 'row',
  },
  mrpLeftSideView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scaledValue(24),
  },
  counterButtonView: {
    position: 'absolute',
    right: 0,
    bottom: scaledValue(0),
    top: scaledValue(13),
  },
});
