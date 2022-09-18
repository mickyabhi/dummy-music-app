export const config = {
  screens: {
    HomeScreen: {
      screens: {
        Home: {
          screens: {
            Meditation: 'meditation',
            Quotes: 'quotes',
            Stories: 'stories/:type',
            Music: 'music',
            Shop: 'shop',
          },
        },
      },
    },
    TrackPlayerScreen: 'trackplayer/:type/:language/:name/:id',
    FeedbackScreen: 'feedback',
    UserProfile: 'userprofile',
    InviteAndRefer: 'invite',
    AboutUs: 'about',
    LanguagePicker: 'language',
    Favourite: 'fav',
    SetAgeGender: 'gender',
  },
};

export const linking = {
  config,
  prefixes: ['neend://', 'http://neend.app', 'https://neend.app'],
};

export default linking;
