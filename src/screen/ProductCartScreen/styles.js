import { StyleSheet } from 'react-native';
import { FONTS } from '~/constants';
import { scaledValue } from '~/utils/design.utils';
export const styles = StyleSheet.create({
  productCartView: {
    flex: 1,
    backgroundColor: '#0B173C',
  },
  productCartMainView: {
    alignItems: 'center',
    paddingTop: scaledValue(30),
  },
  subtotalText: {
    color: '#ffffff',
    fontSize: scaledValue(12),
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    letterSpacing: scaledValue(1),
  },
  totalProductText: {
    color: '#ffffff',
    fontSize: scaledValue(14),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    letterSpacing: scaledValue(1),
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaledValue(41),
  },
  taxIncludedText: {
    color: '#97A4C5',
    width: scaledValue(160),
    fontSize: scaledValue(10),
    lineHeight: scaledValue(16),
    marginLeft: scaledValue(38),
  },
  cartButton: {
    height: scaledValue(68.22),
    width: scaledValue(69.09),
    alignSelf: 'center',
    marginBottom: scaledValue(45.78),
    marginTop: scaledValue(63),
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: scaledValue(16),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    letterSpacing: scaledValue(0.8),
    fontWeight: '600',
  },
  addItemText: {
    width: scaledValue(232),
    color: '#CDCDCD',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontSize: scaledValue(14),
    fontWeight: '400',
    marginTop: scaledValue(3),
    lineHeight: scaledValue(20),
  },
  likeText: {
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    fontSize: scaledValue(12),
    lineHeight: scaledValue(20),
    letterSpacing: scaledValue(1),
    color: '#ffffff',
    marginTop: scaledValue(55),
    marginBottom: scaledValue(21.2),
    alignSelf: 'center',
  },
  cartCardView: {
    paddingLeft: scaledValue(30),
    paddingRight: scaledValue(10),
  },

  upiDiscountText: {
    fontSize: scaledValue(12),
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    letterSpacing: scaledValue(0.1),
    color: 'rgba(248, 231, 28, 1)',
    marginTop: scaledValue(6),
    marginLeft: scaledValue(38),
  },
});
