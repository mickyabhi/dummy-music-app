import { scaledValue } from '../../utils/design.utils';
import { StyleSheet } from 'react-native';
import { FONTS } from '~/constants';
export const style = StyleSheet.create({
  feedbackScreenView: {
    flex: 1,
    backgroundColor: '#03174C',
  },
  feedBackScreenMainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLabel: {
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    fontSize: scaledValue(22),
    lineHeight: scaledValue(32),
    textAlign: 'center',
    color: '#FFFFFF',
    width: scaledValue(258),
  },
  feedbackInput: {
    backgroundColor: '#586894',
    borderColor: '#727E9D',
    borderWidth: 1,
    borderRadius: 5,
    height: 91,
    letterSpacing: 0.8,
    fontSize: 20,
    color: 'white',
    width: '100%',
    paddingLeft: 12,
    textAlignVertical: 'top',
  },
  msgTextInHindi: {
    fontFamily: 'Helvetica Neue',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: scaledValue(22),
    lineHeight: scaledValue(34),
    marginTop: scaledValue(24),
    color: '#fff',
    width: scaledValue(340),
    textAlign: 'center',
    marginBottom: scaledValue(40),
    maxWidth: '80%',
  },
  likeDislikeButtonsView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: scaledValue(30),
  },
  storiesNameText: {
    color: '#937DE2',
    marginHorizontal: scaledValue(20),
  },
});
