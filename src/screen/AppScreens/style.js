import { StyleSheet } from 'react-native';
import { scaledValue } from '../../utils/design.utils';
import { FONTS } from '../../constants';
export const style = StyleSheet.create({
  fallbackImageContainer: {
    width: '100%',
    height: scaledValue(200),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C4C4C414',
  },
  fallbackImageStyles: {
    width: scaledValue(100),
    height: scaledValue(100),
  },
  ZenSparks: {
    marginBottom: scaledValue(150),
  },
  ZenSparksCategories: {
    flexDirection: 'row',
    marginBottom: scaledValue(10),
    marginLeft: scaledValue(7),
    marginTop: scaledValue(5),
  },
  zenSparkActiveText: {
    borderBottomColor: '#937DE2',
    borderBottomWidth: scaledValue(3),
    fontSize: scaledValue(12),
    paddingBottom: scaledValue(2),
    color: '#fff',
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  zenSparkText: {
    color: '#515979',
    fontSize: scaledValue(12),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  dot: {
    fontSize: scaledValue(40),
    color: '#ffff',
    position: 'relative',
    bottom: scaledValue(25),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaledValue(20),
    marginLeft: scaledValue(10),
  },
  CategoryText: {
    color: '#515979',
    fontSize: scaledValue(12),
    textAlign: 'center',
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  CategoryTextActive: {
    borderBottomColor: '#937DE2',
    borderBottomWidth: scaledValue(3),
    fontSize: scaledValue(12),
    paddingBottom: scaledValue(7.46),
    color: '#fff',
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  homeScreenView: {
    flex: 1,
    backgroundColor: '#0B173C',
  },

  card: {
    width: scaledValue(312),
    alignSelf: 'center',
    textAlign: 'center',
  },
  welcomeText: {
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontStyle: 'normal',
    fontSize: scaledValue(16),
    letterSpacing: scaledValue(0.2),
    color: '#FFFFFF',
    marginLeft: scaledValue(13),
  },
  welcomeTextLabel: {
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: scaledValue(16),
    lineHeight: scaledValue(20),
    letterSpacing: scaledValue(0.5),
    color: '#98A0BD',
    marginBottom: scaledValue(20),
    marginLeft: scaledValue(25),
  },
  drawerIconImg: {
    marginLeft: scaledValue(16),
  },
  drawerNdTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaledValue(5),
    height: scaledValue(56),
  },
  SongName: {
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    fontSize: scaledValue(14),
    letterSpacing: scaledValue(0.3),
    color: '#E6E7F2',
    marginTop: scaledValue(6),
  },
  SongTitle: {
    fontWeight: 'normal',
    fontSize: scaledValue(12),
    letterSpacing: scaledValue(0.8),
    color: '#98A0BD',
    marginTop: scaledValue(5),
  },
  songDuration: {
    fontSize: scaledValue(10),
    color: '#98A0BD',
  },
  songArtist: {
    fontWeight: 'normal',
    fontSize: scaledValue(10),
    letterSpacing: scaledValue(0.8),
    color: '#98A0BD',
    marginTop: scaledValue(5),
  },
  description: {
    color: '#98A1BD',
    marginTop: scaledValue(5),
    marginBottom: scaledValue(2),
    fontSize: scaledValue(10),
    lineHeight: scaledValue(10),
  },
  View: {
    backgroundColor: '#1F265E',
    borderRadius: scaledValue(8),
    padding: scaledValue(6),
    marginBottom: scaledValue(15),
    elevation: scaledValue(6),
  },
  netConnectionMainView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '60%',
    backgroundColor: '#03174C',
  },
  netImage: {
    width: scaledValue(60),
    height: scaledValue(50),
    marginBottom: scaledValue(8),
  },
  netConnectionText: {
    flex: 1,
    color: 'white',
    fontFamily: 'Helvetica Neue',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: scaledValue(14),
    lineHeight: scaledValue(20),
    letterSpacing: scaledValue(0.8),
  },
  bgImageView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    width: '100%',
    height: scaledValue(197.76),
    borderRadius: scaledValue(8),
  },
  songDetailsView: {
    paddingVertical: scaledValue(2),
    paddingHorizontal: scaledValue(5),
    width: '100%',
  },
  artistNameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomTabsView: {
    height: scaledValue(56),
    backgroundColor: '#03174C',
    borderTopWidth: scaledValue(1),
    borderTopColor: '#03174C',
    marginVertical: scaledValue(5),
  },
  languageButton: {
    borderWidth: scaledValue(1),
    borderColor: '#F8E71C',
    borderRadius: scaledValue(20),
    position: 'absolute',
    right: scaledValue(20),
  },
  langButtonText: {
    fontSize: scaledValue(10),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    letterSpacing: scaledValue(0.8),
  },
  cartButton: {
    position: 'absolute',
    right: scaledValue(20),
  },
  artistView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
