const { FONTS } = require('~/constants');
const { scaledValue } = require('~/utils/design.utils');
import { StyleSheet } from 'react-native';
import { isNumeric } from '~/utils/common.utils';

export const styles = StyleSheet.create({
  getInTouchMainView: {
    backgroundColor: '#0B173C',
    flex: 1,
  },
  textInputContainer: {
    paddingTop: scaledValue(29),
    paddingHorizontal: scaledValue(28),
  },
  textLabel: {
    fontSize: scaledValue(14),
    color: '#ffffff',
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    marginBottom: scaledValue(12),
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#727E9D',
    backgroundColor: '#586894',
    borderRadius: scaledValue(5),
    paddingLeft: scaledValue(19),
    color: '#ffffff',
    fontSize: scaledValue(14),
  },
  nameTextInput: (number, name) => ({
    borderWidth: 1,
    borderColor: number?.length === 10 && name === '' ? 'red' : '#727E9D',
    backgroundColor: '#586894',
    borderRadius: scaledValue(5),
    paddingLeft: scaledValue(19),
    color: '#ffffff',
    fontSize: scaledValue(14),
  }),
  textInputMessage: {
    borderWidth: 1,
    borderColor: '#727E9D',
    backgroundColor: '#586894',
    borderRadius: scaledValue(5),
    paddingLeft: scaledValue(19),
    paddingTop: scaledValue(15),
    height: scaledValue(92),
    textAlignVertical: 'top',
    color: '#ffffff',
    fontSize: scaledValue(14),
  },
  inputView: {
    marginBottom: scaledValue(30),
  },
  countryCodeView: { justifyContent: 'center' },
  countryCode: {
    fontSize: scaledValue(14),
    color: '#B5C5EF',
    position: 'absolute',
    zIndex: scaledValue(1),
    left: scaledValue(19),
  },
  textMobileNumInput: (number, message) => ({
    borderWidth: 1,
    borderColor:
      (message !== '' && number.length !== 10) || !isNumeric(number)
        ? 'red'
        : '#727E9D',
    backgroundColor: '#586894',
    borderRadius: scaledValue(5),
    paddingLeft: scaledValue(48),
    color: '#ffffff',
    fontSize: scaledValue(14),
  }),
  error: {
    textAlign: 'left',
    color: 'red',
  },
});
