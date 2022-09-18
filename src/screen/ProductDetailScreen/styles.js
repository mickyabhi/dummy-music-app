import { StyleSheet } from 'react-native';
import { FONTS } from '~/constants';
import { scaledValue } from '~/utils/design.utils';
export const styles = StyleSheet.create({
  productDetailView: {
    flex: 1,
    backgroundColor: '#0B173C',
  },
  productDetailMainView: {
    flex: 1,
    paddingVertical: scaledValue(12),
    alignItems: 'center',
  },
  productImage: {
    width: scaledValue(298),
    height: scaledValue(200),
    marginHorizontal: scaledValue(31),
  },
  titleText: {
    color: '#fff',
    marginVertical: scaledValue(15),
    width: scaledValue(297),
    fontSize: scaledValue(16),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  mrpView: {
    width: scaledValue(297),
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    color: '#937DE2',
    fontSize: scaledValue(14),
    textAlign: 'center',
    marginRight: scaledValue(8),
    textDecorationLine: 'line-through',
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  minimumPriceText: {
    color: '#fff',
    fontSize: scaledValue(14),
    textAlign: 'center',
    marginLeft: scaledValue(8),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  quantityText: {
    width: scaledValue(297),
    marginVertical: scaledValue(8),
    color: '#BBC0CF',
    fontSize: scaledValue(12),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  counterView: {
    width: scaledValue(297),
    marginVertical: scaledValue(10),
  },
  shareOnView: {
    paddingTop: scaledValue(30),
  },
  shareText: {
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    fontSize: scaledValue(12),
    color: '#937DE2',
    marginLeft: scaledValue(31),
  },
  socialMediaIcon: {
    width: scaledValue(20),
    height: scaledValue(20),
  },
  shareIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  allIcon: {
    marginLeft: scaledValue(16),
    flexDirection: 'row',
    // width: scaledValue(96),
    justifyContent: 'space-around',
  },
  descriptionText: {
    width: scaledValue(280),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontSize: scaledValue(12),
    color: '#ffff',
    marginLeft: scaledValue(31),
    marginVertical: scaledValue(26),
    letterSpacing: scaledValue(1),
    lineHeight: scaledValue(22),
  },
  productCategory: {
    color: '#ffffff',
  },
  productCatContainer: {
    marginHorizontal: scaledValue(51),
    paddingBottom: scaledValue(0),
    flexDirection: 'row',
  },
  divider: {
    borderWidth: scaledValue(0.4),
    borderColor: '#B5C5EF',
    marginBottom: scaledValue(26),
    width: scaledValue(290),
    marginHorizontal: scaledValue(30),
  },
  productDetailsCardView: {
    marginLeft: scaledValue(31),
  },
  dot: {
    width: scaledValue(7.96),
    height: scaledValue(7.96),
    marginTop: scaledValue(20),
    marginRight: scaledValue(10),
  },
});
