import { StyleSheet } from 'react-native';
import { FONTS } from '~/constants';
import { scaledValue } from '~/utils/design.utils';

export const styles = StyleSheet.create({
  categoryContainer: {
    paddingLeft: scaledValue(31),
    flexDirection: 'row',
    width: scaledValue(360),
    alignItems: 'center',
    paddingVertical: scaledValue(11.15),
    marginBottom: scaledValue(24),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#0B173C',
  },
  favImage: {
    width: scaledValue(111.91),
    height: scaledValue(184),
    alignSelf: 'center',
  },
  noFavText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: scaledValue(16),
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    letterSpacing: scaledValue(0.5),
    marginTop: scaledValue(13.71),
  },
  favSubText: {
    fontSize: scaledValue(14),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    color: '#ffffff',
    width: scaledValue(257),
    textAlign: 'center',
    letterSpacing: scaledValue(0.8),
    marginHorizontal: scaledValue(50),
    marginTop: scaledValue(12),
    lineHeight: scaledValue(19),
  },
  categoryText: {
    color: '#515979',
    fontSize: scaledValue(12),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    textTransform: 'capitalize',
  },
  favFilterView: {
    paddingLeft: scaledValue(10),
    paddingRight: scaledValue(10),
    paddingTop: scaledValue(5),
    paddingBottom: scaledValue(5),
    borderRadius: scaledValue(8),
  },

  categoryTextActive: {
    borderBottomColor: '#937DE2',
    borderBottomWidth: scaledValue(3),
    fontSize: scaledValue(12),
    paddingBottom: scaledValue(7.46),
    color: '#fff',
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    textTransform: 'capitalize',
  },
  saveIcon: { width: scaledValue(10), height: scaledValue(16) },
});
