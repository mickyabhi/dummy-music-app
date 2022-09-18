import React, { useRef, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Keyboard,
  StatusBar,
  ToastAndroid,
  Image,
} from 'react-native';
import Button from '~/components/Button';
import { scaledValue } from '~/utils/design.utils';
import ResendCodeUI from '../../components/ResendCode';
import { analytics } from '~/utils/analytics';
import { useNavigation } from '@react-navigation/native';
import { Auth } from '~/firebase';
import { FONTS } from '~/constants';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/store/UiSlice';
import { style } from './styles';
import logo from '../../../assets/images/logo.png';

const OtpScreen = props => {
  const dispatch = useDispatch();
  const confirmationResult = props?.route?.params?.confirmationResult;
  const number = props?.route?.params?.number;
  const [error, setError] = useState(null);
  const [clearOtpTimeout, setClearInterval] = useState(false);
  const [otp, setOtp] = useState('');
  const input1 = useRef(null);
  const navigation = useNavigation();

  const handleEnterKeyPress = key => {
    if (key === 'Enter') {
      if (otp?.length === 6) {
        confirmCode();
      }
    }
  };

  const resendOtpHandler = async () => {
    try {
      analytics.trackEvent('sign_up_screen', {
        CTA: 'Enter phone number & name',
        action: 'Signs in with phone number',
      });
      const countryCode = '+91';

      const confirmation = await Auth().signInWithPhoneNumber(
        countryCode.concat(number),
      );

      if (confirmation) {
        setLoading(false);
        ToastAndroid.show('OTP Sent Successfully!', ToastAndroid.SHORT);
      }
    } catch (errors) {
      dispatch(setLoading(false));
      ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
      setError(errors);
    }
  };

  const confirmCode = async () => {
    setError(null);
    analytics.trackEvent('OTP_screen', {
      CTA: 'Confirm OTP',
    });
    try {
      if (otp !== '') {
        Keyboard.dismiss();
        dispatch(setLoading(true));
        const result = await confirmationResult
          .confirm(otp)
          .then(setClearInterval(true));
        if (result) {
          dispatch(setLoading(false));
          analytics.trackEvent('user_sign_up', {
            CTA: 'User signed up successfully',
            method: 'phone',
          });
          navigation.replace('SetName');
        }
      }
    } catch (err) {
      dispatch(setLoading(false));
      setError('Invalid OTP!');
    }
  };

  return (
    <>
      <View style={style.mainContainer}>
        <StatusBar backgroundColor="#0B173C" />
        <Image style={style.logo} source={logo} />
        <Text style={style.textLabel}>
          Verify OTP sent to your mobile number
        </Text>
        <TextInput
          style={style.textInput}
          keyboardType="numeric"
          value={otp}
          ref={input1}
          onChangeText={text => setOtp(text)}
          maxLength={6}
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={() => handleEnterKeyPress('Enter')}
          returnKeyType="send"
          textAlign="center"
        />
        {error && <Text style={style.error}>{error}</Text>}
        <ResendCodeUI
          setUserInFirebase={resendOtpHandler}
          clearOtpTimeout={clearOtpTimeout}
        />
        <Button
          title="Verify"
          backgroundColor="#937DE2"
          borderColor={otp?.length !== 6 ? '#586894' : '#937DE2'}
          marginTop={scaledValue(50)}
          disabled={otp?.length !== 6}
          onPress={confirmCode}
          width={scaledValue(280)}
          fontFamily={FONTS.OPEN_SANS_REGULAR}
        />
      </View>
    </>
  );
};
export default OtpScreen;
