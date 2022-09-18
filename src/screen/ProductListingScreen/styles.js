import { StyleSheet } from 'react-native';
import { FONTS } from '~/constants';
import { scaledValue } from '~/utils/design.utils';

export const styles = StyleSheet.create({
  productListingPageView: {
    flex: 1,
    backgroundColor: '#0B173B',
  },
  dotView: {
    flex: 1,
    alignItems: 'center',
  },
  shippingMessage: {
    width: scaledValue(324),
    height: scaledValue(28),
    justifyContent: 'center',
    backgroundColor: '#F27979',
    marginBottom: scaledValue(8),
    marginLeft: scaledValue(18),
  },
  shippingText: {
    fontSize: scaledValue(12),
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  dot: {
    width: scaledValue(6),
    height: scaledValue(6),
    marginTop: scaledValue(14),
    marginBottom: scaledValue(18),
    marginRight: scaledValue(6),
  },
});
