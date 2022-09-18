import { StyleSheet } from 'react-native';
import { FONTS } from '~/constants';
import { scaledValue } from '~/utils/design.utils';

export const styles = StyleSheet.create({
  containerStyle: {
    width: scaledValue(312),
    backgroundColor: '#03174C',
    left: scaledValue(8.5),
    top: scaledValue(117),
    borderRadius: scaledValue(8),
    borderWidth: scaledValue(1),
    borderColor: '#E6E7F2',
    padding: scaledValue(20),
    position: 'absolute',
  },
  titleText: {
    color: '#fff',
    marginBottom: scaledValue(29.63),
    fontSize: scaledValue(14),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  itemCardView: {
    flexDirection: 'row',
    marginBottom: scaledValue(16),
  },
  productImage: {
    width: scaledValue(119.26),
    height: scaledValue(77.96),
  },
  productName: {
    color: '#fff',
    fontSize: scaledValue(14),
    width: scaledValue(149),
    marginLeft: scaledValue(12),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  cancelIconView: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelIcon: {
    width: scaledValue(16),
    height: scaledValue(16),
  },
  continueShoppingText: {
    fontSize: scaledValue(14),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    textDecorationLine: 'underline',
    color: '#ffffff',
    marginBottom: scaledValue(14),
    textAlign: 'center',
  },
  upiDiscountText: {
    fontSize: scaledValue(12),
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    color: 'rgba(248, 231, 28, 1)',
    marginBottom: scaledValue(16),
  },
});
