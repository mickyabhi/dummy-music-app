import { StyleSheet } from 'react-native';
import { scaledValue } from '~/utils/design.utils';

export const sharedStyles = StyleSheet.create({
  heading: {
    fontSize: scaledValue(18),
    lineHeight: 26.51,
    fontWeight: 'bold',
    color: '#F8E71C',
    fontFamily: 'Helvetica Neue',
  },
  text: {
    fontSize: scaledValue(14),
    lineHeight: 22,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',

    color: 'white',
  },
  button: {
    borderColor: '#937DE2',
    backgroundColor: '#937DE2',
    // removing baked in styles
    marginTop: 0,
    fontFamily: 'Helvetica Neue',
    fontSize: scaledValue(14),
  },
  container: {
    flex: 1,
    backgroundColor: '#0B173C',
  },
  image: {
    width: scaledValue(200),
    resizeMode: 'contain',
    marginTop: scaledValue(21),
  },
});
