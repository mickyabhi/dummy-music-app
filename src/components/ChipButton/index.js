import React from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateLanguagePreference, setCategoryRefresh } from '~/store/UiSlice';
import { scaledValue } from '~/utils/design.utils';
import { Chip } from 'react-native-paper';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import { analytics } from '~/utils/analytics';
import { Auth } from '~/firebase';
import { setItemInAsyncStorage } from '~/storage';

const ChipButton = props => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.ui.currentLanguage);
  const navigation = useNavigation();
  const userIdentifier =
    Auth()?.currentUser?.phoneNumber?.replace('+', '_') ||
    Auth()?.currentUser?.email?.split('.').join('_');

  const handleLanguageChange = async () => {
    try {
      dispatch(setCategoryRefresh(true));
      navigation.navigate('HomeScreen', {
        screen: 'Home',
        categoryRefresh: true,
      });
      await database()
        .ref('/users/' + userIdentifier)
        .update({
          languagePreference: props?.value,
        });
      setItemInAsyncStorage('lastPlayedTrack', '');
      dispatch(updateLanguagePreference(props?.value));
      analytics.setUserProperties('language', props?.value);
      analytics.trackEvent('language_screen', {
        language: props?.value,
      });
    } catch (error) {
      console.log('FAILED TO DO THIS ', error.message);
    }

    ToastAndroid.showWithGravity(
      `Language has been set to ${props?.label}!`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const styles = StyleSheet.create({
    buttonContainer: {
      width: scaledValue(130),
      height: scaledValue(38),
      borderRadius: scaledValue(9999),
      alignItems: 'center',
      marginVertical: scaledValue(6),
      backgroundColor:
        currentLanguage === props?.value ? '#937DE2' : 'transparent',
      borderColor: currentLanguage === props?.value ? '#937DE2' : '#727E9D',
      borderWidth: 1,
    },
    labelColor: {
      color: '#ffffff',
      fontFamily: 'OpenSans-Regular',
    },
  });

  return (
    <>
      <Chip
        mode="outlined"
        onPress={handleLanguageChange}
        textStyle={styles.labelColor}
        style={styles.buttonContainer}>
        {props?.label}
      </Chip>
    </>
  );
};
export default ChipButton;
