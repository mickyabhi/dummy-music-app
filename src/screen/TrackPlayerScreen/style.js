import { StyleSheet } from 'react-native';
import { FONTS } from '~/constants';
import { scaledValue } from '../../utils/design.utils';
export const style = StyleSheet.create({
  descriptionText: {
    fontWeight: '400',
    fontSize: scaledValue(16),
    textAlign: 'center',
    color: '#fff',
    padding: scaledValue(10),
    fontFamily: 'Montserrat',
  },
  musicPlayerView: {
    flex: 1,
    backgroundColor: '#0B173C',
  },
  TextView: {
    fontFamily: 'Helvetica Neue',
    fontStyle: 'normal',
    alignItems: 'center',
    height: 39,
  },
  textLabel: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: scaledValue(28),
    lineHeight: scaledValue(34),
    letterSpacing: 1,
    color: '#FFFFFF',
  },
  Text2: {
    paddingTop: 15,
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 1,
    color: '#D3D3D3',
  },
  trackCoverImg: {
    width: scaledValue(360),
    height: scaledValue(202),
  },
  backNavigationButtonView: {
    position: 'absolute',
    top: scaledValue(24),
    left: scaledValue(24),
  },
  feedBackButtonView: {
    position: 'absolute',
    top: scaledValue(24),
    right: scaledValue(-35),
    flexDirection: 'row',
    width: scaledValue(90),
    justifyContent: 'space-between',
  },
  lineargradientImage: {
    flex: 1,
  },
  aboutSongView: {
    alignItems: 'center',
    backgroundColor: '#432',
  },
  musicPlayerMainView: {
    flex: 1,
    alignItems: 'center',
  },
  trackOptionView: {
    marginTop: scaledValue(48),
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  trackDurationView: {
    alignItems: 'center',
    width: '100%',
  },

  backNavigationView: {
    position: 'absolute',
    top: scaledValue(24),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaledValue(24),
  },
  whatsAppIcon: {
    width: scaledValue(23),
    height: scaledValue(23),
    marginRight: scaledValue(5),
  },

  mainView: {
    position: 'absolute',
    top: scaledValue(24),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaledValue(24),
  },
  rowView: {
    flexDirection: 'row',
  },
  feedbackView: {
    flexDirection: 'row',
  },
  shareButton: {
    borderColor: '#F8E71C',
    borderWidth: 1,
    borderRadius: scaledValue(20),
    width: scaledValue(111),
    alignSelf: 'center',
    position: 'absolute',
    bottom: scaledValue(111),
  },
  buttonLableText: {
    fontSize: scaledValue(14),
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
  },
  avatarHeartIcon: { backgroundColor: 'rgba(3, 23, 76, 0.5)' },
  boldText: {
    fontWeight: 800,
  },
  shareContainer: {
    marginBottom: scaledValue(108),
    flexDirection: 'row',
    width: scaledValue(161),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scaledValue(97),
  },
  alignCenterView: {
    alignItems: 'center',
  },
  alignCenterSave: {
    alignItems: 'center',
    width: scaledValue(40),
  },
  alignCenterShare: {
    alignItems: 'center',
  },
  textStyle: {
    fontSize: scaledValue(10),
    letterSpacing: scaledValue(0.8),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    marginTop: scaledValue(4),
  },
  socialIcon: {
    width: scaledValue(24),
    height: scaledValue(24),
  },
  slider: {
    width: scaledValue(303),
    marginTop: scaledValue(50),
  },
});
