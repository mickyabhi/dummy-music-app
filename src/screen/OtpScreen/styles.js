import { scaledValue } from '~/utils/design.utils';
import { StyleSheet } from 'react-native';
import { FONTS } from '~/constants';
export const style = StyleSheet.create({
  textLabel: {
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontSize: scaledValue(14),
    lineHeight: scaledValue(22),
    color: '#FFFFFF',
    letterSpacing: scaledValue(0.02),
    marginBottom: scaledValue(12),
    width: scaledValue(290),
  },
  logo: {
    marginTop: scaledValue(51),
    width: scaledValue(66.18),
    height: scaledValue(81),
    marginBottom: scaledValue(55.99),
  },
  textInput: {
    backgroundColor: '#586894',
    borderWidth: scaledValue(1),
    borderRadius: scaledValue(5),
    fontSize: scaledValue(14),
    color: '#FFFFFF',
    height: scaledValue(50),
    letterSpacing: scaledValue(0.8),
    textAlign: 'center',
    width: scaledValue(300),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  error: {
    color: 'red',
    marginTop: scaledValue(3),
    width: scaledValue(300),
  },
  goBackText: {
    color: 'white',
    fontSize: scaledValue(24),
  },
  verifyButtonView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: scaledValue(30),
    width: scaledValue(280),
    backgroundColor: 'red',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#0B173C',
    alignItems: 'center',
  },
  otpView: {
    paddingHorizontal: scaledValue(38),
    paddingTop: scaledValue(21),
  },
});
