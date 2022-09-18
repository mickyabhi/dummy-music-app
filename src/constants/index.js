const { Dimensions } = require('react-native');
export const { height: windowHeight } = Dimensions.get('window');
export var RealHeight;
export const BaseURL = 'https://d2z284jirfzmcj.cloudfront.net';

export let UserProfileData;

export const { width: screenWidth, height: screenHeight } =
  Dimensions.get('screen');

export const SetHeight = height => {
  RealHeight = height;
};

export const userProfileData = userData => {
  UserProfileData = userData;
};

import crashlytics from '@react-native-firebase/crashlytics';
export const Crashlytics = crashlytics;

export const setUserDetailInCrashlytics = (phoneNumber, displayName = null) => {
  try {
    if (phoneNumber) Crashlytics().setUserId(phoneNumber);
    if (displayName) Crashlytics().setAttribute('userName', displayName);
  } catch (err) {
    Crashlytics().recordError(err);
  }
};

export const TOTAL_ONBOARDING_SCREENS = 6;

export const FONTS = {
  OPEN_SANS_REGULAR: 'OpenSans-Regular',
  OPEN_SANS_SEMIBOLD: 'OpenSans-SemiBold',
  COMFORTAA_REGULAR: 'Comfortaa-Regular',
  COMFORTAA_SEMIBOLD: 'Comfortaa-SemiBold',
};

export const PRODUCT_DETAILS = {
  INGREDIENTS: 'Ingredients',
  BENEFITS: 'Benefits',
  DOSAGE: 'Dosage',
};

export const sortCategory = categories => {
  const sortedCategories = [];
  categories?.forEach(category => {
    if (category === 'story') sortedCategories[1] = 'story';
    else if (category === 'music') sortedCategories[2] = 'music';
    else if (category === 'meditation') sortedCategories[3] = 'meditation';
  });
  return sortedCategories;
};
