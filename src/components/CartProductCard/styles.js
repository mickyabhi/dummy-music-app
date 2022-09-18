import { StyleSheet } from 'react-native';
import { FONTS } from '~/constants';
import { scaledValue } from '~/utils/design.utils';

export const styles = StyleSheet.create({
  cartProductCard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  card: {
    borderBottomColor: '#B5C5EF',
    borderBottomWidth: scaledValue(0.5),
    marginBottom: scaledValue(22),
    paddingBottom: scaledValue(24),
    height: scaledValue(144),
  },
  productImage: {
    width: scaledValue(70.25),
    height: scaledValue(40.87),
  },
  productRate: {
    marginTop: scaledValue(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productDetail: {
    flexDirection: 'column',
  },
  productName: {
    width: scaledValue(195),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontSize: scaledValue(12),
    color: '#fff',
    lineHeight: scaledValue(20),
  },
  rateText: {
    fontFamily: 'Open Sans',
    fontSize: scaledValue(12),
    color: '#B5C5EF',
  },
  cardButton: {
    marginTop: scaledValue(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    width: scaledValue(9),
    height: scaledValue(11),
  },
  productPrice: {
    fontFamily: 'Open Sans',
    fontSize: scaledValue(14),
    color: '#fff',
    letterSpacing: scaledValue(1),
  },
  productDivider: {
    width: scaledValue(303.01),
    height: scaledValue(0.5),
    color: '#fff',
  },
});
