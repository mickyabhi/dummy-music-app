import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Keyboard,
  ToastAndroid,
  BackHandler,
  NativeModules,
  Alert,
} from 'react-native';
import { HelperText } from 'react-native-paper';
import google from '~assets/images/google-logo.png';
import { scaledValue } from '~/utils/design.utils';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Auth } from '~/firebase';
import { analytics } from '~/utils/analytics';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { isNumeric } from '~/utils/common.utils';
import Button from '~/components/Button';
import { setLoading } from '~/store/UiSlice';
import { style } from './styles';
import { FONTS } from '~/constants';
import bgImage from '../../../assets/images/app-bg.png';
import logo from '../../../assets/images/logo.png';
import ReactMoE from 'react-native-moengage';

const SignUpScreen = () => {
  const { TruecallerAuthModule } = NativeModules;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [number, setNumber] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const backAction = () => {
    BackHandler.exitApp();
  };
  useEffect(() => {
    setTimeout(() => {
      handleTruecallerAuth();
    }, 500);
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const updateUserData = async (name, email, identifier) => {
    if (name && identifier) {
      Auth().currentUser.updateProfile({
        displayName: name,
      });
      const userRef = database()?.ref('users');
      identifier = identifier?.replace('.', '_');
      await userRef.child(identifier).update({
        email: email || '',
      });
      analytics.trackEvent('user_sign_up', {
        CTA: 'User signed up successfully',
        method: 'truecaller',
      });
      const isOnBoarding = await database()
        .ref('configs/isOnBoarding')
        .once('value')
        .then(resp => resp.val());
      const userData = await database()
        .ref('users')
        .child(identifier)
        .once('value')
        .then(val => val.val());
      const onBoarding = await database()
        .ref('onBoarding')
        .child(identifier)
        .once('value')
        .then(val => val.val());
      if (!onBoarding && isOnBoarding) {
        dispatch(setLoading(false));
        navigation.navigate('SetAgeGender');
        return;
      }
      const preferredLanguage = userData?.languagePreference;
      if (!preferredLanguage) {
        dispatch(setLoading(false));
        navigation.replace('LanguagePicker');
        return;
      }
      dispatch(setLoading(false));
      navigation.replace('HomeScreen');
    }
  };

  const handleTruecallerAuth = async () => {
    if (TruecallerAuthModule) {
      const trueCallerResult = await TruecallerAuthModule.authenticate();
      if (trueCallerResult.error) {
        return;
      }
      if (trueCallerResult?.phoneNumber) {
        ReactMoE.setUserUniqueID(trueCallerResult?.phoneNumber);
        ReactMoE.setUserContactNumber(trueCallerResult?.phoneNumber);
        trueCallerResult.phoneNumber = trueCallerResult?.phoneNumber?.replace(
          '+',
          '_',
        );
        dispatch(setLoading(true));
        analytics.trackEvent('social_signup_attempt', { method: 'truecaller' });
        Auth()
          .createUserWithEmailAndPassword(
            trueCallerResult?.phoneNumber + '@trueCaller.in',
            trueCallerResult?.phoneNumber,
          )
          .then(() => {
            Auth()
              .signInWithEmailAndPassword(
                trueCallerResult.phoneNumber + '@trueCaller.in',
                trueCallerResult.phoneNumber,
              )
              .then(resp =>
                updateUserData(
                  trueCallerResult.firstName,
                  trueCallerResult.email,
                  resp.user.email,
                ),
              )
              .catch(err => {
                Alert.alert(err.code);
                dispatch(setLoading(false));
                analytics.trackEvent('social_signup_fail', {
                  method: 'truecaller',
                });
              });
          })

          .catch(() => {
            return Auth()
              .signInWithEmailAndPassword(
                trueCallerResult.phoneNumber + '@trueCaller.in',
                trueCallerResult.phoneNumber,
              )
              .then(resp =>
                updateUserData(
                  trueCallerResult.firstName,
                  trueCallerResult.email,
                  resp.user.email,
                ),
              )
              .catch(err => {
                Alert.alert(err.code);
                dispatch(setLoading(false));
                analytics.trackEvent('social_signup_fail', {
                  method: 'truecaller',
                });
              });
          });
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const {
      idToken,
      user: { email },
    } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    dispatch(setLoading(true));
    analytics.trackEvent('social_signup_attempt', { method: 'google' });
    await auth()
      .signInWithCredential(googleCredential)
      .then(async credentialUser => {
        const emailAddress = email.split('.').join('_');
        const phoneNumber = credentialUser?.user?.phoneNumber?.replace(
          '+',
          '_',
        );
        analytics.trackEvent('user_sign_up', {
          CTA: 'User signed up successfully',
          method: 'google',
        });
        const userData = await database()
          .ref('users')
          .child(emailAddress || phoneNumber)
          .once('value')
          .then(val => val.val());
        const onBoarding = await database()
          .ref('onBoarding')
          .child(emailAddress || phoneNumber)
          .once('value')
          .then(val => val.val());
        const isOnBoarding = await database()
          .ref('configs/isOnBoarding')
          .once('value')
          .then(resp => resp.val());
        if (!onBoarding && isOnBoarding) {
          dispatch(setLoading(false));
          navigation.navigate('SetAgeGender');
          return;
        }
        const preferredLanguage = userData?.languagePreference;
        if (!preferredLanguage) {
          dispatch(setLoading(false));
          navigation.replace('LanguagePicker');
          return;
        }
        dispatch(setLoading(false));
        navigation.replace('HomeScreen');
        return;
      })
      .catch(error => {
        analytics.trackEvent('social_signup_fail', { method: 'google' });
        setLoading(false);
        if (error.code === 'auth/account-exists-with-different-credential') {
          setLoginError(
            'Facebook account already exists. Please use it to login.',
          );
        }
      });
  };

  const signInUsingPhoneNumber = async () => {
    try {
      Keyboard.dismiss();
      dispatch(setLoading(true));
      analytics.trackEvent('sign_up_attempt', {
        method: 'phone',
      });
      const countryCode = '+91';
      const confirmationResult = await Auth()
        .signInWithPhoneNumber(countryCode.concat(number))
        .catch(error => {
          console.log('signInWithPhoneNumber.error', error);
          return null;
        });
      if (confirmationResult) {
        dispatch(setLoading(false));
        ToastAndroid.show('OTP Sent Successfully!', ToastAndroid.SHORT);
        navigation.replace('OtpScreen', {
          confirmationResult,
          number,
        });
        return;
      } else {
        ToastAndroid.show(
          'Something went wrong, please try again later..',
          ToastAndroid.SHORT,
        );
      }
    } catch (errors) {
      dispatch(setLoading(false));
      analytics.trackEvent('user_sign_up_fail', { method: 'phone' });
      ToastAndroid.show(
        'Something went wrong, please try again later..',
        ToastAndroid.SHORT,
      );

      console.log('errors', errors);
      setLoginError("We couldn't sign you up. Please try again.");
    }
  };

  const handleOnKeyPress = key => {
    if (key === 'Enter') {
      if (isNumeric(number) && number?.length === 10) {
        setLoading(true);
        signInUsingPhoneNumber();
      }
    }
  };

  const handlePhoneNumberValidation = () => {
    return number && !isNumeric(number);
  };

  const handleSubmit = () => {
    if (isNumeric(number) && number?.length === 10) {
      setLoading(true);
      signInUsingPhoneNumber();
    }
  };

  return (
    <ImageBackground source={bgImage} style={style.loginMainView}>
      <StatusBar backgroundColor="#0B173C" />
      <Image style={style.logo} source={logo} />
      <Text style={style.textLabel}>Mobile number</Text>
      <View style={style.inputView}>
        <Text style={style.inputText}>+91</Text>
        <TextInput
          style={style.mobileTextInput(number)}
          keyboardType="number-pad"
          value={number}
          onChangeText={text => {
            setNumber(text);
          }}
          maxLength={10}
          enablesReturnKeyAutomatically={true}
          returnKeyType="send"
          onSubmitEditing={() => handleOnKeyPress('Enter')}
        />
      </View>
      <HelperText style={style.error} visible={handlePhoneNumberValidation()}>
        Phone Number is invalid!
      </HelperText>
      <Button
        title="Send verification code"
        backgroundColor={'#937DE2'}
        borderColor={number?.length !== 10 ? '#586894' : '#937DE2'}
        width={scaledValue(300)}
        height={scaledValue(48)}
        fontSize={scaledValue(14)}
        marginTop={scaledValue(0)}
        disabled={number?.length !== 10}
        onPress={() => handleSubmit()}
        fontFamily={FONTS.OPEN_SANS_REGULAR}
      />
      <View style={style.dividerMainView}>
        <View style={style.dividerLine} />
        <Text style={style.orText}>OR</Text>
        <View style={style.dividerLine} />
      </View>
      {loginError && <Text style={style.loginErrorText}>{loginError}</Text>}
      <View style={style.socialIconMainView}>
        <TouchableOpacity
          onPress={handleGoogleSignIn}
          style={style.loginWithGoogleContainer}>
          <View style={style.loginWithGoogle}>
            <Image source={google} style={style.socialIcon} />
            <Text style={style.googleButtonText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;
