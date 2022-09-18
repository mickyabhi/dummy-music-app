import { scaledValue } from '~/utils/design.utils';
import { StyleSheet } from 'react-native';
import { FONTS } from '../../constants';

export const styles = StyleSheet.create({
  languageContainer: {
    flex: 1,
    backgroundColor: '#0B173C',
  },
  container: inAppLanguagePicker => ({
    alignItems: 'center',
    marginTop: !inAppLanguagePicker ? scaledValue(116) : scaledValue(60),
    flex: 1,
  }),
  boldText: {
    fontSize: scaledValue(16),
    color: '#fff',
    marginTop: scaledValue(16),
    textAlign: 'center',
    letterSpacing: scaledValue(0.32),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    lineHeight: scaledValue(22),
  },
  text: {
    fontSize: scaledValue(16),
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: scaledValue(10),
  },
  CTA_button: {
    marginVertical: scaledValue(20),
    borderRadius: scaledValue(5),
    marginHorizontal: scaledValue(10),
    borderWidth: scaledValue(1),
    borderColor: '#727E9D',
    paddingVertical: scaledValue(5),
    paddingHorizontal: scaledValue(20),
    textAlign: 'center',
  },
  imageStyles: {
    width: scaledValue(150.62),
    height: scaledValue(101.52),
  },
  hindiText: {
    color: 'white',
    textAlign: 'center',
    fontSize: scaledValue(20),
  },
  languageButtonContainer: {
    paddingHorizontal: scaledValue(20),
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: scaledValue(20),
  },
  yellowText: { color: '#F8E71C' },
  innerContainer: { maxWidth: '90%' },
});
