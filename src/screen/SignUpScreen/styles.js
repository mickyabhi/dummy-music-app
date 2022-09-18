import { StyleSheet } from 'react-native';
import { FONTS } from '~/constants';
import { isNumeric } from '~/utils/common.utils';
import { scaledValue } from '~/utils/design.utils';
export const style = StyleSheet.create({
  loginMainView: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    marginTop: scaledValue(51),
    width: scaledValue(66.18),
    height: scaledValue(81),
    marginBottom: scaledValue(55.99),
  },
  loginErrorText: {
    color: 'red',
    fontSize: scaledValue(14),
    marginTop: scaledValue(6),
  },
  textLabel: {
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontSize: scaledValue(14),
    letterSpacing: scaledValue(0.2),
    color: '#FFFFFF',
    marginBottom: scaledValue(12),
    width: scaledValue(300),
  },
  inputText: {
    zIndex: scaledValue(1),
    fontSize: scaledValue(14),
    color: '#B5C5EF',
    position: 'absolute',
    paddingLeft: scaledValue(24),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scaledValue(300),
    marginBottom: scaledValue(33),
  },
  loginWithTruecaller: {
    borderRadius: 99,
    paddingVertical: scaledValue(15),
    paddingHorizontal: scaledValue(15),
    marginLeft: 15,
    backgroundColor: '#0090E9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginWithGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginWithGoogleContainer: {
    borderRadius: scaledValue(42),
    paddingVertical: scaledValue(13),
    backgroundColor: '#ffffff',
    width: scaledValue(300),
  },

  googleButtonText: {
    color: 'rgba(11, 23, 60, 1)',
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    marginLeft: scaledValue(13.5),
    fontSize: scaledValue(14),
  },
  error: {
    color: 'red',
    paddingTop: scaledValue(5),
    width: scaledValue(300),
  },
  dividerMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaledValue(33),
  },
  dividerLine: {
    width: scaledValue(39),
    height: 1,
    backgroundColor: '#97A4C5',
  },
  orText: {
    width: scaledValue(36),
    textAlign: 'center',
    color: '#97A4C5',
    fontSize: scaledValue(12),
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
  },
  socialIconMainView: {
    marginTop: scaledValue(30),
  },
  socialIcon: {
    height: scaledValue(22),
    width: scaledValue(22),
    resizeMode: 'contain',
  },
  mobileTextInput: number => ({
    backgroundColor: '#586894',
    borderWidth: scaledValue(1),
    borderRadius: scaledValue(5),
    fontSize: scaledValue(14),
    color: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    letterSpacing: scaledValue(0.8),
    width: '100%',
    paddingLeft: scaledValue(55),
    borderColor: number && !isNumeric(number) ? 'red' : '#727E9D',
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  }),
});
