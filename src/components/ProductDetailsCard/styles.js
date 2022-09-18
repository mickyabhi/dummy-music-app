import { StyleSheet } from 'react-native';
import { scaledValue } from '~/utils/design.utils';
import { FONTS } from '~/constants';
export const styles = StyleSheet.create({
  productDetailsCardView: {
    flexDirection: 'row',
    marginRight: scaledValue(41),
    marginBottom: scaledValue(27),
  },
  ingredientIcon: {
    width: scaledValue(48),
    height: scaledValue(48),
    marginRight: scaledValue(12),
  },
  cardIcon: {
    width: scaledValue(48),
    height: scaledValue(48),
    marginRight: scaledValue(13),
  },
  productDetailsCardRightView: {
    width: scaledValue(220),
    flexDirection: 'column',
  },
  InActiveProductDetailsCardRightView: {
    width: scaledValue(280),
    flexDirection: 'column',
  },
  cardTitle: {
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontWeight: '400',
    fontSize: scaledValue(14),
    letterSpacing: scaledValue(0.8),
    color: '#FFFFFF',
    marginBottom: scaledValue(8),
    marginTop: scaledValue(5.25),
  },
  dosageDescription: {
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontWeight: '400',
    fontSize: scaledValue(12),
    lineHeight: scaledValue(22),
    letterSpacing: scaledValue(0.8),
    color: '#FFFFFF',
    marginBottom: scaledValue(400),
  },
  cardDescription: {
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontWeight: '400',
    fontSize: scaledValue(12),
    lineHeight: scaledValue(22),
    letterSpacing: scaledValue(0.8),
    color: '#FFFFFF',
  },
});
