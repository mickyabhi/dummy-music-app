import { StyleSheet } from 'react-native';
import { FONTS } from '~/constants';
import { scaledValue } from '~/utils/design.utils';
export const styles = StyleSheet.create({
  aboutUsView: {
    flex: 1,
  },
  aboutUsMainView: {
    flex: 1,
    backgroundColor: '#0B173C',
    alignItems: 'center',
    textAlign: 'left',
  },
  aboutUsText: {
    fontSize: scaledValue(14),
    color: '#fff',
    width: scaledValue(320),
    lineHeight: scaledValue(20),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    letterSpacing: scaledValue(0.8),
    textAlign: 'justify',
  },
  aboutAppText: {
    fontSize: scaledValue(12),
    color: '#F2F2F2',
    width: scaledValue(292),
    marginTop: scaledValue(27),
    lineHeight: scaledValue(20),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    letterSpacing: scaledValue(0.8),
    textAlign: 'justify',
  },
  allRightText: {
    fontSize: scaledValue(10),
    color: '#F2F2F2',
    marginTop: scaledValue(18),
    marginBottom: scaledValue(47),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    letterSpacing: scaledValue(0.8),
  },
  neendLogo: {
    resizeMode: 'contain',
    width: scaledValue(140),
    height: scaledValue(120),
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
