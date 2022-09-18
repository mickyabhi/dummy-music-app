import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  ImageBackground,
  Text,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from '~/firebase';
import database from '@react-native-firebase/database';
import { SetHeight } from '~/constants';
import { scaledValue } from '~/utils/design.utils';
import splashBackgroundImage from '../../../assets/images/app-bg.png';
import { FONTS } from '../../constants';
import VersionInfo from 'react-native-version-info';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from 'react-native-paper';
import ReactMoE, { MoEAppStatus } from 'react-native-moengage';

const Splash = () => {
  const [visible, setVisible] = useState(false);
  const user = Auth().currentUser;
  const identifier =
    Auth()?.currentUser?.phoneNumber?.replace('+', '_') ||
    Auth()?.currentUser?.email?.split('.').join('_');
  const navigation = useNavigation();

  const findDimensions = async layout => {
    const { height } = layout;
    SetHeight(height);
  };

  const updateApp = async () => {
    ReactMoE.setAppStatus(MoEAppStatus.Update);
    await Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.neend',
    );
  };

  const initUserData = async () => {
    if (user) {
      const onBoarding = await database()
        .ref('onBoarding')
        .child(identifier)
        .once('value')
        .then(val => val.val());
      const userData = await database()
        .ref('/users/' + identifier)
        .once('value')
        .then(val => val.val());
      const isOnBoarding = await database()
        .ref('configs/isOnBoarding')
        .once('value')
        .then(resp => resp.val());
      if (user.displayName === null) {
        navigation.replace('SetName');
        return;
      }

      if (!onBoarding && isOnBoarding) {
        navigation.replace('SetAgeGender');
        return;
      }
      const preferredLanguage = userData?.languagePreference;
      if (!preferredLanguage) {
        navigation.replace('LanguagePicker');
        return;
      }
      if (user) {
        navigation.replace('HomeScreen');
        return;
      }
    }
    navigation.replace('SignUpScreen');
    return;
  };
  const checkAppVersion = async () => {
    await database()
      .ref('configs/minVersion')
      .once('value')
      .then(resp => {
        if (resp.val() > VersionInfo.appVersion) {
          setVisible(true);
          return;
        }
        initUserData();
      });
  };

  useEffect(() => {
    checkAppVersion();
  }, []);

  return (
    <Provider>
      <View
        style={style.view}
        onLayout={event => findDimensions(event.nativeEvent.layout)}>
        <StatusBar backgroundColor="#0B173C" />
        <ImageBackground
          source={splashBackgroundImage}
          style={style.splashImage}>
          <View style={style.appNameTitle}>
            <Image
              style={style.logoImage}
              source={require('../../../assets/images/logo.png')}
            />
          </View>
          <Text style={style.appSlogan}>Making India Sleep Better</Text>
        </ImageBackground>
        <Portal>
          <Dialog visible={visible} dismissible={false}>
            <Dialog.Title>New version available</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Please, update app to new version </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={updateApp}>Update</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default Splash;

const style = StyleSheet.create({
  view: {
    flex: 1,
  },
  splashImage: {
    flex: 1,
  },
  logoImage: {
    width: scaledValue(142.44),
    height: scaledValue(162),
    marginBottom: scaledValue(20),
    resizeMode: 'contain',
  },

  appNameTitle: {
    marginTop: scaledValue(239),
    alignItems: 'center',
    justifyContent: 'center',
  },
  appSlogan: {
    alignSelf: 'center',
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontStyle: 'normal',
    fontSize: scaledValue(14),
    letterSpacing: scaledValue(0.5),
    color: '#D3D3D3',
    position: 'absolute',
    bottom: scaledValue(80),
  },
});
