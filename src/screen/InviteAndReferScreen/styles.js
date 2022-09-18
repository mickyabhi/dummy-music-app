import { StyleSheet } from 'react-native';
import { scaledValue } from '~/utils/design.utils';

export const styles = StyleSheet.create({
  inviteAndReferView: {
    flex: 1,
  },
  inviteAndReferMainView: {
    paddingVertical: scaledValue(16),
    backgroundColor: '#0B173C',
    alignItems: 'center',
  },
  inviteMobileImage: {
    width: scaledValue(302),
    height: scaledValue(288),
  },
  inviteMsgImage: {
    marginVertical: scaledValue(32),
    width: scaledValue(238),
    height: scaledValue(62),
  },
  shareView: {
    backgroundColor: '#1E2B52',
    width: scaledValue(302),
    paddingVertical: scaledValue(13),
    paddingHorizontal: scaledValue(9),
    borderRadius: scaledValue(5),
  },
  shareText: {
    color: '#fff',
    fontSize: scaledValue(14),
    fontWeight: '400',
    textAlign: 'center',
  },
  twitter: {
    width: scaledValue(30),
    height: scaledValue(30),
  },
  facebook: {
    width: scaledValue(30),
    height: scaledValue(29.82),
  },
  whatsApp: {
    width: scaledValue(30),
    height: scaledValue(30),
  },
  telegram: {
    width: scaledValue(30),
    height: scaledValue(30),
  },
  dots: {
    width: scaledValue(30),
    height: scaledValue(7.5),
  },
  socialIconsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scaledValue(20),
  },
  partition: {
    width: scaledValue(198),
    height: scaledValue(19),
    marginTop: scaledValue(17),
    alignSelf: 'center',
  },
});
