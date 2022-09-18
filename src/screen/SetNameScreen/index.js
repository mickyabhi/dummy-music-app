import {
  StyleSheet,
  Image,
  View,
  TextInput,
  Text,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import logo from '../../../assets/images/logo.png';
import { scaledValue } from '~/utils/design.utils';
import { FONTS, setUserDetailInCrashlytics } from '~/constants';
import Button from '~/components/Button';
import { Auth } from '~/firebase';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/store/UiSlice';
import { analytics } from '~/utils/analytics';

const SetUserName = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const phoneNumber = Auth()?.currentUser?.phoneNumber?.replace('+', '_');
  const dispatch = useDispatch();
  const handleNavigate = async () => {
    const isOnBoarding = await database()
      .ref('configs/isOnBoarding')
      .once('value')
      .then(resp => resp.val());
    const onBoarding = await database()
      .ref('onBoarding')
      .child(phoneNumber)
      .once('value')
      .then(val => val.val());

    if (!onBoarding && isOnBoarding) {
      navigation.navigate('SetAgeGender');
      dispatch(setLoading(false));
      return;
    }
    const userData = await database()
      .ref('/users/' + phoneNumber)
      .once('value')
      .then(val => val.val());
    const preferredLanguage = userData?.languagePreference;
    if (!preferredLanguage) {
      navigation.replace('LanguagePicker');
      dispatch(setLoading(false));
      return;
    }
    navigation.replace('HomeScreen');
    dispatch(setLoading(false));
    return;
  };

  const handleEnterKeyPress = async () => {
    dispatch(setLoading(true));
    Auth()
      .currentUser.updateProfile({ displayName: name })
      .then(() => {
        handleNavigate();
      })
      .catch(err => console.log(err));
    await database()
      .ref('/users/' + phoneNumber)
      .update({
        name,
      });
    setUserDetailInCrashlytics(Auth()?.currentUser?.phoneNumber, name);
    analytics.trackEvent('set_user_name', {
      CTA: 'Submitted user name',
    });
  };
  return (
    <View style={styles.setUserNameView}>
      <StatusBar backgroundColor="#0B173C" />

      <Image style={styles.logoImg} source={logo} />
      <Text style={styles.textLabel}>Your Name </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setName(text)}
        value={name}
        enablesReturnKeyAutomatically={true}
        onSubmitEditing={() => handleEnterKeyPress('Enter')}
        returnKeyType="send"
      />
      <Button
        title="Get Started"
        backgroundColor="#937DE2"
        borderColor={name === '' ? '#586894' : '#937DE2'}
        marginTop={scaledValue(50)}
        disabled={name === ''}
        onPress={() => handleEnterKeyPress()}
        width={scaledValue(280)}
        fontFamily={FONTS.OPEN_SANS_REGULAR}
      />
    </View>
  );
};

export default SetUserName;

const styles = StyleSheet.create({
  setUserNameView: {
    flex: 1,
    alignItems: 'center',
  },
  logoImg: {
    marginTop: scaledValue(51),
    width: scaledValue(66.18),
    height: scaledValue(81),
    marginBottom: scaledValue(55.99),
  },
  textInput: {
    backgroundColor: '#586894',
    borderWidth: scaledValue(1),
    borderRadius: scaledValue(5),
    fontSize: scaledValue(14),
    color: '#FFFFFF',
    height: scaledValue(50),
    letterSpacing: scaledValue(0.8),
    width: scaledValue(300),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    paddingHorizontal: scaledValue(12),
  },
  textLabel: {
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontSize: scaledValue(14),
    lineHeight: scaledValue(22),
    color: '#FFFFFF',
    letterSpacing: scaledValue(0.02),
    marginBottom: scaledValue(12),
    width: scaledValue(290),
  },
});
